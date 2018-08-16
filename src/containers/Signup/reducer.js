/*
 *
 * Signup reducer
 * 
 * configure in store/rootReducer
 */

import {
  DEFAULT_ACTION,
  SET_LOADING,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CONFIRM_SIGN_UP,
  CONFIRM_SIGN_UP_SUCCESS,
  CONFIRM_SIGN_UP_FAILED,
} from "./constants";

const initialState = {
  isLoading: false,
  success: false,
  alertOpen: false,
  error: {
    message: "",
  },
};

function signupReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case SIGN_UP:
      return state;
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };
    case SIGN_UP_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case CONFIRM_SIGN_UP:
      return state;
    case CONFIRM_SIGN_UP_SUCCESS:
      return state;
    case CONFIRM_SIGN_UP_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}

export default signupReducer;
