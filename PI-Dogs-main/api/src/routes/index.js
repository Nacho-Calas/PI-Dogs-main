const { Router } = require("express");
const axios = require("axios");
const { Raza, Temperamento } = require("../db");

const router = Router();

// Las funciones son asincronas ya que esperan respuesta de la api o de la db

const getApiInfo = async () => {
  // Traemos toda la info de la API
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds"); //Usamos axios, fetch en desuso
  const apiInfo = await apiUrl.data.map((dogs) => {
    return {
      id: dogs.id,
      name: dogs.name,
      height: dogs.height.metric,
      weight: dogs.weight.metric,
      life_span: dogs.life_span,
      temperament: dogs.temperament,
      origin: dogs.origin,
      image: dogs.image.url,
      bred_for: dogs.bred_for,
    };
  });
  return apiInfo;
};
const getTemperaments = async () => {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiTemps = await api.data
    .map((dogs) => {
      return dogs.temperament;
    })
    .join() // Tengo que usar join por como entra la info en la api ["Stubborn, Curious, Playful"] => "Stubborn, Curious, Playful"
    .split(","); // => [ 'Stubborn', ' Curious', ' Playful']

  const allTemps = [];
  
  apiTemps.map((temp)=>{
    if (!allTemps.includes(temp.trim() && temp)){ //Entender el if
      allTemps.push(temp.trim());
    }
  });

  allTemps.map(async (temp) => {
    await Temperamento.findOrCreate({
      where: {
        name: temp,
      },
    });
  });
};
const dataBaseInfo = async () => {
  // Traemos toda la info de la Base de Datos
  return await Raza.findAll({
    include: {
      model: Temperamento,
      attributes: ["name"],
      trough: {
        attributes: [],
      },
    },
  });
};

const getAllData = async () => {
  // Concatenamos toda la informacion para unir nuestra DATA.
  const apiInfo = await getApiInfo();
  const dbInfo = await dataBaseInfo();
  const apiDbInfo = apiInfo.concat(dbInfo);
  return apiDbInfo;
};

router.get("/dogs", async (req, res) => {
  //Recibimos por Query el name y filtramos dentro del array
  const { name } = req.query;
  const perros = await getAllData();
  if (name) {
    try {
      let perro = await perros.filter((perro) =>
        perro.name.toLowerCase().includes(name.toLowerCase())
      );
      return res.status(201).send(perro);
    } catch (err) {
      res.status(404).send("No se ha encontrado un perro con ese nombre");
    }
  } else {
    res.status(200).send(perros);
  }
});

router.get("/dogs/:id", async (req, res) => {
  //Recibimos por params nuestro ID y hacemos Find dentro de nuestro array

  const { id } = req.params;
  const perros = await getAllData();

  try {
    let perro = await perros.find((e) => e.id.toString() === id);
    res.status(200).send(perro);
  } catch (err) {
    res.status(404).send("No se ha encontrado un perro con ese ID D:");
  }
});

router.post("/dogs", async (req, res) => {
  const {
    name,
    height,
    weight,
    life_span,
    image,
    temperament,
    created_in_dogs,
  } = req.body;

  if (!name || !height || !weight || !life_span || !image || !temperament) {
    res.status(404).send("Falta informacion necesaria");
  }

  let dogCreated = await Raza.create({
    name,
    height,
    weight,
    life_span,
    image,
    created_in_dogs,
  });
  let tempdb = await Temperamento.findAll({
    where: {
      name: temperament,
    },
  });
  dogCreated.addTemperamento(tempdb);
  res.status(200).send("Tu perro fue creado con exito!");
});

router.get("/temperaments", async (req, res) => {
  await getTemperaments();
  const alltemps = await Temperamento.findAll();
  const nameTemp = alltemps.map (temp => temp.name)
  res.status(200).json(nameTemp)
});

module.exports = router;
