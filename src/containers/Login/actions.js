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

export function googleSignIn(data) {
  return {
    type: GOOGLE_SIGN_IN,
    data,
  };
}

export function googleSignInSuccess(data) {
  return {
    type: GOOGLE_SIGN_IN_SUCCESS,
    data,
  };
}

export function googleSignInFailed(error) {
  return {
    type: GOOGLE_SIGN_IN_FAILED,
    error,
  };
}

export function facebookSignIn(data) {
  return {
    type: FACEBOOK_SIGN_IN,
    data,
  };
}

export function facebookSignInSuccess(data) {
  return {
    type: FACEBOOK_SIGN_IN_SUCCESS,
    data,
  };
}

export function facebookSignInFailed(error) {
  return {
    type: FACEBOOK_SIGN_IN_FAILED,
    error,
  };
}

export function signIn(data) {
  return {
    type: SIGN_IN,
    data,
  };
}

export function signInSuccess(data) {
  return {
    type: SIGN_IN_SUCCESS,
    data,
  };
}

export function signInFailed(error) {
  return {
    type: SIGN_IN_FAILED,
    error,
  };
}

export function getAuthenticatedUser() {
  return {
    type: GET_AUTHENTICATED_USER,
  };
}

export function getAuthenticatedUserSuccess(data) {
  return {
    type: GET_AUTHENTICATED_USER_SUCCESS,
    data,
  };
}

export function getAuthenticatedUserFailed(error) {
  return {
    type: GET_AUTHENTICATED_USER_FAILED,
    error,
  };
}
