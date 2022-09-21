import React from "react";
import style from "./DogCards.module.css";

export default function DogCards({id, name, weight, image, temperament}) {
  return (
    <div className={style.cards}>
      <img className={style.img} src={image} alt="DogIMG" width="200px" height="200px" />
      <h3>{name}</h3>
      <h5>Temperament: {temperament}</h5>
      <h5>Weight: {weight} kg</h5>
      <h5>{id}</h5>
    </div>
  );
}
