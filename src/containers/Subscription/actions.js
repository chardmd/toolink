/*
 *
 * Subscription actions
 *
 */

import { BILL_USER, BILL_USER_SUCCESS, BILL_USER_FAILED } from "./constants";

export function billUser() {
  return {
    type: BILL_USER,
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
