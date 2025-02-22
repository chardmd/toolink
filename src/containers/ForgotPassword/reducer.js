import {
  SET_LOADING,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_CODE,
} from "./constants";

const INITIAL_STATE = {
  isLoading: false,
  success: false,
  error: {
    message: "",
  },
};

const forgotPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case FORGOT_PASSWORD:
      return state;
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSuccess: action.isSuccess,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        error: action.err,
      };
    case FORGOT_PASSWORD_CODE:
      return state;
    default:
      return state;
  }
};

export default forgotPasswordReducer;
