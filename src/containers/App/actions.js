import {
  LOGOUT,
  SET_AUTHENTICATING,
  SET_AUTHENTICATED,
  SET_LOADING,
  DISPLAY_ALERT,
} from "./constants";

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function setAuthenticating(status) {
  return {
    type: SET_AUTHENTICATING,
    status,
  };
}

export function setAuthenticated(status) {
  return {
    type: SET_AUTHENTICATED,
    status,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING,
    status,
  };
}

export function displayAlert(message, status) {
  return {
    type: DISPLAY_ALERT,
    message,
    status,
  };
}
