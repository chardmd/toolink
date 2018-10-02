/*
 *
 * Subscription reducer
 * 
 * configure in store/rootReducer
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

const initialState = {
  isLoading: false,
};

function subscriptionReducer(state = initialState, action) {
  switch (action.type) {
    case BILL_USER:
      return state;
    case BILL_USER_SUCCESS:
      return state;
    case BILL_USER_FAILED:
      return state;
    case GET_PLAN:
      return state;
    case GET_PLAN_SUCCESS:
      return {
        ...state,
        data: getPlanIds(action.data.data),
      };
    case GET_PLAN_FAILED:
      return state;
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    default:
      return state;
  }
}

const getPlanIds = data => data.reduce((agg, curr) => agg.concat(curr.id), []);

export default subscriptionReducer;
