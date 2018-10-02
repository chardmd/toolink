/*
 *
 * Subscription saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { BILL_USER, GET_PLAN } from "./constants";
import {
  billUserSuccess,
  billUserFailed,
  getPlanSuccess,
  getPlanFailed,
  setLoading,
} from "./actions";

function* handleBillUser({ source, email, error }) {
  try {
    if (error) {
      throw error;
    }

    yield call([API, API.post], "toolink", "/billing/subscription", {
      body: {
        source,
        email,
        planId: "plan_DhFH0U4tfPW55q", //temp
      },
    });
    yield put(billUserSuccess());
  } catch (e) {
    yield put(billUserFailed(e));
  }
}

function* handleGetPlan() {
  try {
    yield put(setLoading(true));
    const response = yield call([API, API.get], "toolink", "/billing/plan");
    yield put(getPlanSuccess(response));
  } catch (e) {
    yield put(getPlanFailed(e));
  }
  yield put(setLoading(false));
}

function* SubscriptionSaga() {
  yield all([
    takeLatest(BILL_USER, handleBillUser),
    takeLatest(GET_PLAN, handleGetPlan),
  ]);
}

export default SubscriptionSaga;
