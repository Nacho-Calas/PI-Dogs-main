import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DogCards from "../DogCards/DogCards";
import { Link } from "react-router-dom";
import { getDogos, getTemps } from "../../actions/appActions";
import Paginado from "../Paginado/Paginado";

import style from "./Home.module.css";
import Logo from "./img/reload.png";

export default function Home() {
  const dispatch = useDispatch(); //NUEVOS HOOKS
  const dogs = useSelector((state) => state.dogs); // SELECTOR DECLARACION DE ESTADO EN dogs
  const temps = useSelector((state) => state.temps);

  //PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsXPage, setDogsXPage] = useState(8);
  const iLastDog = currentPage * dogsXPage;
  const iFirstDog = iLastDog - dogsXPage;
  const currentDogs = dogs.slice(iFirstDog, iLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //DESPACHA LA ACCION LLAMA FUNCION TRAER TODOS LOS PERROS EN ESTADO
  useEffect(() => {
    dispatch(getDogos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  //LOGRO ACTUALIZAR MI PAGINA CON UN EL CLICK
  function handleClick(e) {
    e.preventDefault(); //Para que no recarge la pagina
    dispatch(getDogos()); //Hago el Get con cada click
  }

  return (
    <div>
      <h1 className={style.header}>Henry Dogs!</h1>
      <button
        className={style.refreshButton} //REFRESH BUTTON
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div className={style.filters}>
          <select>{/* DE LA A - Z */}
            <option value="asc">By A-Z</option>
            <option value="desc">By Z-A</option>
          </select>
          <select>{/* POR TEMPERAMENTO */}
            <option selected="true" disabled="disabled">
              By Temperament
            </option>
            {temps.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select>{/* POR PESO! */}
            <option value="peso">Weigth</option>
          </select>
          <select>{/* API O DATABASE */}
            <option value="api">Api</option>
            <option value="database">DataBase</option>
          </select>
        </div>

        <img className={style.logo} src={Logo} alt="reload_BTN" />
      </button>

      <div className={style.cards}>
        {currentDogs?.map(
          (
            e //CARTA DE LOS PERROS MUESTRA
          ) => (
            <Link to={`/dogs/${e.id}`} key={e.id}>
              <DogCards
                key={e.id}
                temperament={e.temperament}
                weight={e.weight}
                name={e.name}
                image={e.image}
              />
            </Link>
          )
        )}
      </div>

      <Paginado dogsXPage={dogsXPage} dogs={dogs.length} paginado={paginado} />
    </div>
  );
}
