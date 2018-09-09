/*
 *
 * Favourites reducer
 */

import {
  GET_FAVOURITES,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAILED,
  REMOVE_FAVOURITES,
  REMOVE_FAVOURITES_SUCCESS,
  REMOVE_FAVOURITES_FAILED,
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
    case REMOVE_FAVOURITES:
      return state;
    case REMOVE_FAVOURITES_SUCCESS:
      const linkId = action.id;
      return state.filter(i => i.linkId !== linkId);
    case REMOVE_FAVOURITES_FAILED:
      return state;
    default:
      return state;
  }
}

export default favouritesReducer;
