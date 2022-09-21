import {
  SET_APP_IS_LOADING,
  CREATE_DOGO,
  GET_ALL_DOGS,
  GET_DOG_DETAIL,
  GET_ALL_TEMPS,
} from "../actions/appActions";

const INITIAL_STATE = {
  isLoading: false,
  dogs: [],
  dogsDetail: [],
  temps: [],
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_APP_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case GET_ALL_DOGS: {
      return { ...state, dogs: action.payload };
    }
    case GET_DOG_DETAIL: {
      return { ...state, dogsDetail: action.payload };
    }
    case GET_ALL_TEMPS: {
      return { ...state, temps: action.payload };
    }
    case CREATE_DOGO: {
      return { ...state };
    }
    default:
      return state;
  }
}

export default rootReducer;
