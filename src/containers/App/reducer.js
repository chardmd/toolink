import {
  LOGOUT,
  SET_AUTHENTICATED,
  SET_AUTHENTICATING,
  SET_LOADING
} from "./constants";

const INITIAL_STATE = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoading: false,
  err: null
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.status
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.status
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status
      };
    case LOGOUT:
      return state;
    default:
      return state;
  }
};

export default appReducer;
