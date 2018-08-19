/*
 *
 * Trash reducer
 * 
 * configure in store/rootReducer
 */

import { GET_TRASH, GET_TRASH_SUCCESS, GET_TRASH_FAILED } from "./constants";

const initialState = [];

function trashReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRASH:
      return state;
    case GET_TRASH_SUCCESS:
      return action.data;
    case GET_TRASH_FAILED:
      return state;
    default:
      return state;
  }
}

export default trashReducer;
