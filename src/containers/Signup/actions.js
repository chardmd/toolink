/*
 *
 * Signup actions
 *
 */

import {
  SET_LOADING,
  SET_ALERT_OPEN,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  CONFIRM_SIGN_UP,
  CONFIRM_SIGN_UP_SUCCESS,
  CONFIRM_SIGN_UP_FAILED
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

export function signUp(email, password) {
  return {
    type: SIGN_UP,
    email,
    password
  };
}

export function signUpSuccess(isSuccess) {
  return {
    type: SIGN_UP_SUCCESS,
    isSuccess
  };
}

export function signUpFailed(error) {
  return {
    type: SIGN_UP_FAILED,
    error
  };
}

export function confirmSignUp(email, confirmationCode, password) {
  return {
    type: CONFIRM_SIGN_UP,
    email,
    confirmationCode,
    password
  };
}

export function confirmSignUpSuccess(isSuccess) {
  return {
    type: CONFIRM_SIGN_UP_SUCCESS,
    isSuccess
  };
}

export function confirmSignUpFailed(error) {
  return {
    type: CONFIRM_SIGN_UP_FAILED,
    error
  };
}
