/*
 *
 * Trash saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, put, all } from "redux-saga/effects";

import { GET_TRASH } from "./constants";

import { getTrashSuccess, getTrashFailed } from "./actions";
import { displayAlert } from "../App/actions";

import trash from "./trash.json";

function* handleGetTrash() {
  try {
    // let url = `https://micro-open-graph-ksguljmysl.now.sh/?url=${category}`;
    // const response = yield call([axios, axios.get], url);
    // console.log("response", response.data);
    yield put(getTrashSuccess(trash));
  } catch (e) {
    yield put(getTrashFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* TrashSaga() {
  yield all([takeLatest(GET_TRASH, handleGetTrash)]);
}

export default TrashSaga;
