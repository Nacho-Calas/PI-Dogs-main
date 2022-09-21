import React from "react";
import { createDogo } from "../../actions/appActions";




const [input, setInput] = useState({
  name: "",
  height:'',
  weight: '',
  life_span: '',
  image: '',
  temperament: '',
  created_in_dogs: '',
})


function CreateDog() {
  return (
  <form>
    <label>Crea tu perro</label>
    <input type="text" placeholder="Nombre"/>
    <input type="text" placeholder="Altura"/>
    <input type="text" placeholder="Peso"/>
    <input type="text" placeholder="Promedio de vida"/>
    <input type="text" placeholder="Temperamentos"/>
    <input type="file" id="fileInput"/>
  </form>
  )
}

export default CreateDog;
