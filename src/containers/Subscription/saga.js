/*
 *
 * Subscription saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { BILL_USER } from "./constants";
import { billUserSuccess, billUserFailed } from "./actions";

function* handleBillUser({ source, error }) {
  try {
    if (error) {
      throw error;
    }

    yield call([API, API.post], "toolink", "/billing/charge", {
      body: {
        source,
      },
    });
    yield put(billUserSuccess());
  } catch (e) {
    yield put(billUserFailed(e));
  }
}

function* SubscriptionSaga() {
  yield all([takeLatest(BILL_USER, handleBillUser)]);
}

export default SubscriptionSaga;
