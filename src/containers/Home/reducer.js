import { LOAD_HOME } from "./constants";

const INITIAL_STATE = {};

const homeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOME:
      return state;
    default:
      return state;
  }
};

export default homeReducer;
