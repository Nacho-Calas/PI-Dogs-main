import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const SET_APP_IS_LOADING = "app/setIsLoading";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const CREATE_DOGO = "CREATE_DOGO"
export const GET_ALL_TEMPS = "GET_ALL_TEMPS"

export function setIsLoading(value) {
  return {
    type: SET_APP_IS_LOADING,
    payload: value,
  };
}

export function getDogos() {
  return async function (dispatch) {
     var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: json.data,
    })
  }
}


export function getDogDetail(id) {
  return async function (dispatch) {
    let json = await axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOG_DETAIL,
      payload: json,
    });
  };
}
export function getTemps() {
  return async function (dispatch) {
    let temps = await axios.get('http://localhost:3001/temperaments');
    return dispatch({
      type: GET_ALL_TEMPS,
      payload: temps.data,
    });
  };
}



export function createDogo({
  name,
  height,
  weight,
  life_span,
  image,
  temperament,
  created_in_dogs}){
    return {
        type: CREATE_DOGO,
        payload: {
            name,
            height,
            weight,
            life_span,
            image,
            temperament,
            created_in_dogs,
        }
    }
}
