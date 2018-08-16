import {
  GOOGLE_SIGN_IN,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAILED,
  FACEBOOK_SIGN_IN,
  FACEBOOK_SIGN_IN_SUCCESS,
  FACEBOOK_SIGN_IN_FAILED,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  GET_AUTHENTICATED_USER,
  GET_AUTHENTICATED_USER_SUCCESS,
  GET_AUTHENTICATED_USER_FAILED,
} from "./constants";

const INITIAL_STATE = {
  data: null,
  error: {
    message: "",
  },
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return state;
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case SIGN_IN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case GOOGLE_SIGN_IN:
      return state;
    case GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case GOOGLE_SIGN_IN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case FACEBOOK_SIGN_IN:
      return state;
    case FACEBOOK_SIGN_IN_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case FACEBOOK_SIGN_IN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case GET_AUTHENTICATED_USER:
      return state;
    case GET_AUTHENTICATED_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case GET_AUTHENTICATED_USER_FAILED:
      return state;
    default:
      return state;
  }
};

export default loginReducer;
