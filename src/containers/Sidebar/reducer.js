import { TRIGGER_SAVE_CATEGORY, SET_LOADING } from "./constants";

const INITIAL_STATE = {
  isLoading: false,
};

const sidebarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRIGGER_SAVE_CATEGORY:
      return state;
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    default:
      return state;
  }
};

export default sidebarReducer;
