import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED,
  LOAD_HOME,
} from "./constants";

const INITIAL_STATE = {
  previewList: [],
};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LINK_DATA:
      return state;
    case GET_LINK_DATA_SUCCESS:
      return {
        ...state,
        previewList: action.data,
      };
    case GET_LINK_DATA_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case SAVE_LINK:
      return state;
    case SAVE_LINK_SUCCESS:
      const data = action.data;
      return {
        ...state,
        previewList: [data, ...state.previewList],
      };
    case SAVE_LINK_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case REMOVE_LINK:
      return state;
    case REMOVE_LINK_SUCCESS:
      const linkId = action.id;
      return {
        ...state,
        previewList: state.previewList.filter(i => i.id !== linkId),
      };
    case REMOVE_LINK_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case LOAD_HOME:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
