import React, { useEffect, useState } from "react";
import style from "./DogDetail.module.css";
import { getDogDetail } from "../../actions/appActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dogo from "../Home/img/200w.gif";

function DogDetail(props) {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogsDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getDogDetail(props.match.params.id));
    setLoading(false);
  }, [dispatch, props.match.params.id]);

  return (
    <div className={style.buttonYform}>
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <button className={style.buttonBack}>Regresar</button>
      </Link>
      <div className={style.card}>
        <h2 className={style.title}>{dogs.name}</h2>

        {loading ? (
          <Dogo size={150} loading={loading} />
        ) : (
          <div>
            <img
              className={style.img}
              src={dogs.image}
              alt="DogIMG"
              width="250px"
              height="250px"
            />
            <h4>
              Temperament:{" "}
              {dogs.temperament || dogs.Temperamentos?.map((e) => e.name + " ")}
            </h4>
            <h4>
              Weight Max: {dogs.weightMax} {dogs.weight} kg
            </h4>
            <h4>
              Weight Min: {dogs.weightMin} {dogs.weight}kg
            </h4>
            <h4>
              Height Max: {dogs.heightMax} {dogs.height}cm
            </h4>
            <h4>
              Height Min: {dogs.heightMin} {dogs.height}cm
            </h4>
            <h4>
              Esperanza de vida:{" "}
              {dogs.created_in_dogs
                ? `${dogs.life_span}  years`
                : dogs.life_span}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default DogDetail;
