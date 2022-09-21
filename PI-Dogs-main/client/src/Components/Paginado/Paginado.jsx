import React from "react";
import style from "./Paginado.module.css"

export default function Paginado({ dogsXPage, paginado, dogs }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(dogs / dogsXPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className={style.ulist}>
        {pageNumber &&
          pageNumber.map((number) => (
            <div className={style.list} key={number}>
              <a onClick={() => paginado(number)}>{number}</a>
            </div>
          ))}
      </ul>
    </div>
  );
}
