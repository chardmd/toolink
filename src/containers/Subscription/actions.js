/*
 *
 * Subscription actions
 *
 */

import {
  BILL_USER,
  BILL_USER_SUCCESS,
  BILL_USER_FAILED,
  GET_PLAN,
  GET_PLAN_SUCCESS,
  GET_PLAN_FAILED,
  SET_LOADING,
} from "./constants";

export function billUser(source, email, error) {
  return {
    type: BILL_USER,
    source,
    email,
    error,
  };
}

export function billUserSuccess() {
  return {
    type: BILL_USER_SUCCESS,
  };
}

export function billUserFailed() {
  return {
    type: BILL_USER_FAILED,
  };
}

export function getPlan() {
  return {
    type: GET_PLAN,
  };
}

export function getPlanSuccess(data) {
  return {
    type: GET_PLAN_SUCCESS,
    data,
  };
}

export function getPlanFailed(err) {
  return {
    type: GET_PLAN_FAILED,
    err,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING,
    status,
  };
}
