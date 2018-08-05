import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED
} from "./constants";

const INITIAL_STATE = {
  previewList: []
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
    default:
      return state;
  }
};

export default homeReducer;
