/*
 *
 * Favourites reducer
 * 
 * configure in store/rootReducer
 */

import { DEFAULT_ACTION } from "./constants";

const initialState = {
  myProperty: "",
};

function favouritesReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default favouritesReducer;
