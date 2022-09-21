import React from "react";
import { Link } from "react-router-dom";
import style from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={style.div}>
      <h1 className={style.titulo}>Bienvenidos a Henry Dogs!</h1>
      <Link to="/home">
        <button className={style.button}>Entrar</button>
      </Link>

      <img src="" alt="jpg" />
    </div>
  );
}

export default LandingPage;
