/*
 *
 * Links reducer
 * 
 */

import {
  GET_CATEGORY_LINKS,
  GET_CATEGORY_LINKS_SUCCESS,
  GET_CATEGORY_LINKS_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED,
} from "./constants";

const initialState = [];

function linksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORY_LINKS:
      return state;
    case GET_CATEGORY_LINKS_SUCCESS:
      return action.data;
    case GET_CATEGORY_LINKS_FAILED:
      return state;
    case SAVE_LINK:
      return state;
    case SAVE_LINK_SUCCESS:
      const data = action.data;
      return [data, ...state];
    case SAVE_LINK_FAILED:
      return state;
    case REMOVE_LINK:
      return state;
    case REMOVE_LINK_SUCCESS:
      const linkId = action.id;
      return state.filter(i => i.id !== linkId);
    case REMOVE_LINK_FAILED:
      return state;
    default:
      return state;
  }
}

export default linksReducer;
