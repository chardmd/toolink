import {
  LOGOUT,
  SET_AUTHENTICATED,
  SET_AUTHENTICATING,
  SET_LOADING,
  DISPLAY_ALERT,
} from "./constants";

const INITIAL_STATE = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoading: false,
  err: null,
  alertMessage: "",
  alertOpen: false,
  links: [],
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.status,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.status,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    case LOGOUT:
      return state;
    case DISPLAY_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertOpen: action.status,
      };
    default:
      return state;
  }
};

export default appReducer;
