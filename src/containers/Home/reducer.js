import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED
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
    case SAVE_LINK:
      return state;
    case SAVE_LINK_SUCCESS:
      const data = action.data;
      return {
        ...state,
        previewList: [data, ...state.previewList]
      };
    case SAVE_LINK_FAILED:
      return {
        ...state,
        err: action.err
      };
    case REMOVE_LINK:
      return state;
    case REMOVE_LINK_SUCCESS:
      const id = action.id;
      return {
        ...state,
        previewList: state.previewList.filter(i => i.id !== id)
      };
    case REMOVE_LINK_FAILED:
      return {
        ...state,
        err: action.err
      };
    default:
      return state;
  }
};

export default homeReducer;
