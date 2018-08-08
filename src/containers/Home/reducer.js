import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED
} from "./constants";

const INITIAL_STATE = {
  previewList: [],
  categories: []
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LINK_DATA:
      return state;
    case GET_LINK_DATA_SUCCESS:
      return {
        ...state,
        previewList: action.data
      };
    case GET_LINK_DATA_FAILED:
      return state;
    case GET_CATEGORIES:
      return state;
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.data
      };
    case GET_CATEGORIES_FAILED:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
