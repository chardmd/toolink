import { takeLatest, all } from "redux-saga/effects";

import { LOAD_HOME } from "./constants";

function* handleLoadHome() {}

function* rootSaga() {
  yield all([takeLatest(LOAD_HOME, handleLoadHome)]);
}

export default rootSaga;
