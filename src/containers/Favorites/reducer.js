/*
 *
 * Favorites reducer
 */

import {
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAILED,
  REMOVE_FAVORITES,
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAILED,
} from "./constants";

const initialState = [];

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITES:
      return state;
    case GET_FAVORITES_SUCCESS:
      return action.data;
    case GET_FAVORITES_FAILED:
      return state;
    case REMOVE_FAVORITES:
      return state;
    case REMOVE_FAVORITES_SUCCESS:
      const linkId = action.id;
      return state.filter(i => i.linkId !== linkId);
    case REMOVE_FAVORITES_FAILED:
      return state;
    default:
      return state;
  }
}

export default favoritesReducer;
