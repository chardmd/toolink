import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import data from "./data.json";

import { GET_LINK_DATA } from "./constants";
import { getLinkDataSuccess, getLinkDataFailed } from "./actions";

function* handleGetLinkData({ category }) {
  try {
    // let url = `https://micro-open-graph-ksguljmysl.now.sh/?url=${category}`;
    // const response = yield call([axios, axios.get], url);
    // console.log("response", response.data);
    yield put(getLinkDataSuccess(data));
  } catch (e) {
    yield put(getLinkDataFailed(e));
  }
}

function* rootSaga() {
  yield all([takeLatest(GET_LINK_DATA, handleGetLinkData)]);
}

export default rootSaga;
