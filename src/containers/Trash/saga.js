/*
 *
 * Trash saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, put, all } from "redux-saga/effects";

import { GET_TRASH, DELETE_TRASH } from "./constants";

import {
  getTrashSuccess,
  getTrashFailed,
  deleteTrashSuccess,
  deleteTrashFailed,
} from "./actions";
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

function* handleDeleteTrash({ id }) {
  try {
    yield put(deleteTrashSuccess(id));
    yield put(displayAlert("Link permanently deleted.", true));
  } catch (e) {
    yield put(deleteTrashFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* TrashSaga() {
  yield all([
    takeLatest(GET_TRASH, handleGetTrash),
    takeLatest(DELETE_TRASH, handleDeleteTrash),
  ]);
}

export default TrashSaga;
