import React from "react";

import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import Logo from "./img/Logo.png";

export default function NavBar() {
  return (
    <div className={style.NavBar}>
      <Link to="/home" className={style.logo}>
        <img className={style.imglogo} src={Logo} alt="logoIMG" />
      </Link>

      <form className={style.searchBar}>
        <input className={style.input} placeholder="Busca tu perro..." maxLength="30" />
        <input className={style.submit} type="submit" value="Search!"/>
      </form>
      <Link to="/createDog">Crea tu perro!</Link>
    </div>
  );
}
