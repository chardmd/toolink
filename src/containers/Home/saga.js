import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";

import { GET_LINK_DATA } from "./constants";
import { getLinkDataSuccess, getLinkDataFailed } from "./actions";

function* handleGetLinkData({ targetUrl }) {
  try {
    let url = `https://micro-open-graph-ksguljmysl.now.sh/?url=${targetUrl}`;
    const response = yield call([axios, axios.get], url);
    yield put(getLinkDataSuccess(response.data));
  } catch (e) {
    yield put(getLinkDataFailed(e));
  }
}

function* rootSaga() {
  yield all([takeLatest(GET_LINK_DATA, handleGetLinkData)]);
}

export default rootSaga;
