import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { SAVE_USER } from "./constants";
import {} from "./actions";

function* rootSaga() {
  //yield all([takeLatest(SAVE_USER, null)]);
}

export default rootSaga;
