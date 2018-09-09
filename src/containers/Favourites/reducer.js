/*
 *
 * Favourites reducer
 * 
 * configure in store/rootReducer
 */

import {
  GET_FAVOURITES,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAILED,
} from "./constants";

const initialState = null;

function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVOURITES:
      return state;
    case GET_FAVOURITES_SUCCESS:
      return action.data;
    case GET_FAVOURITES_FAILED:
      return state;
    default:
      return state;
  }
}

export default favouritesReducer;
