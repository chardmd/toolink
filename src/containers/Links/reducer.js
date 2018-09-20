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
  BOOKMARK_LINK,
  BOOKMARK_LINK_SUCCESS,
  BOOKMARK_LINK_FAILED,
  REMOVE_LINK_CATEGORY,
  REMOVE_LINK_CATEGORY_SUCCESS,
  REMOVE_LINK_CATEGORY_FAILED,
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
      return state.filter(i => i.linkId !== linkId);
    case REMOVE_LINK_FAILED:
      return state;
    case BOOKMARK_LINK:
      return state;
    case BOOKMARK_LINK_SUCCESS:
      return state.map(
        p => (p.linkId === action.id ? { ...p, isFavorite: !action.status } : p)
      );
    case BOOKMARK_LINK_FAILED:
      return state;
    case REMOVE_LINK_CATEGORY:
      return state;
    case REMOVE_LINK_CATEGORY_SUCCESS:
      return state;
    case REMOVE_LINK_CATEGORY_FAILED:
      return state;
    default:
      return state;
  }
}

export default linksReducer;
