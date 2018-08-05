import {
  SET_LOADING,
  SET_ALERT_OPEN,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_CODE
} from "./constants";

export function setLoading(isLoading) {
  return {
    type: SET_LOADING,
    isLoading
  };
}

export function setAlertOpen(alertOpen) {
  return {
    type: SET_ALERT_OPEN,
    alertOpen
  };
}

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    email
  };
}

export function forgotPasswordSuccess(isSuccess) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    isSuccess
  };
}

export function forgotPasswordFailed(err) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    err
  };
}

export function forgotPasswordCode(email, confirmationCode, password) {
  return {
    type: FORGOT_PASSWORD_CODE,
    email,
    confirmationCode,
    password
  };
}
