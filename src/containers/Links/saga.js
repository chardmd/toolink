/*
 *
 * Links saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, put, all } from "redux-saga/effects";

import { DEFAULT_ACTION } from "./constants";

function* handleMySaga() {
  // implementation
}

function* LinksSaga() {
  yield all([takeLatest(DEFAULT_ACTION, handleMySaga)]);
}

export default LinksSaga;
