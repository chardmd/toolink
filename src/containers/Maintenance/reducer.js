/*
 *
 * Trash reducer
 * 
 * configure in store/rootReducer
 */

import {
  GET_TRASH,
  GET_TRASH_SUCCESS,
  GET_TRASH_FAILED,
  DELETE_TRASH,
  DELETE_TRASH_SUCCESS,
  DELETE_TRASH_FAILED,
  DELETE_ALL,
  DELETE_ALL_SUCCESS,
  DELETE_ALL_FAILED,
} from "./constants";

const initialState = [];

function trashReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRASH:
      return state;
    case GET_TRASH_SUCCESS:
      return action.data;
    case GET_TRASH_FAILED:
      return state;
    case DELETE_TRASH:
      return state;
    case DELETE_TRASH_SUCCESS:
      const trashId = action.id;
      return state.filter(i => i.linkId !== trashId);
    case DELETE_TRASH_FAILED:
      return state;
    case DELETE_ALL:
      return state;
    case DELETE_ALL_SUCCESS:
      return initialState;
    case DELETE_ALL_FAILED:
      return state;
    default:
      return state;
  }
}

export default trashReducer;
