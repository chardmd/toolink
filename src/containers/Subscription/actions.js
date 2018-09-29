/*
 *
 * Subscription actions
 *
 */

import { BILL_USER, BILL_USER_SUCCESS, BILL_USER_FAILED } from "./constants";

export function billUser(source, error) {
  return {
    type: BILL_USER,
    source,
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
