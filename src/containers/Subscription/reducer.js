/*
 *
 * Subscription reducer
 * 
 * configure in store/rootReducer
 */

import { BILL_USER, BILL_USER_SUCCESS, BILL_USER_FAILED } from "./constants";

const initialState = {
  myProperty: "",
};

function subscriptionReducer(state = initialState, action) {
  switch (action.type) {
    case BILL_USER:
      return state;
    case BILL_USER_SUCCESS:
      return state;
    case BILL_USER_FAILED:
      return state;
    default:
      return state;
  }
}

export default subscriptionReducer;
