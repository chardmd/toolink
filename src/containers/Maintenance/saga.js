/*
 *
 * Trash saga
 * 
 * configure in store/rootSaga
 */
import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { GET_TRASH, DELETE_TRASH, DELETE_ALL } from "./constants";

import {
  getTrashSuccess,
  getTrashFailed,
  deleteTrashSuccess,
  deleteTrashFailed,
  deleteAllSuccess,
  deleteAllFailed,
} from "./actions";
import { displayAlert, setLoading } from "../App/actions";

function* handleGetTrash() {
  try {
    yield put(setLoading(true));
    const response = yield call([API, API.get], "toolink", "/trash");
    yield put(getTrashSuccess(response));
    yield put(setLoading(false));
  } catch (e) {
    yield put(getTrashFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleDeleteTrash({ id }) {
  try {
    yield call([API, API.del], "toolink", `/trash/${id}`);
    yield put(deleteTrashSuccess(id));
    yield put(displayAlert("Link permanently deleted.", true));
  } catch (e) {
    yield put(deleteTrashFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleDeleteAll() {
  try {
    yield call([API, API.del], "toolink", "/trash");
    yield put(deleteAllSuccess());
    yield put(displayAlert("Empty Trash Success.", true));
  } catch (e) {
    yield put(deleteAllFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* TrashSaga() {
  yield all([
    takeLatest(GET_TRASH, handleGetTrash),
    takeLatest(DELETE_TRASH, handleDeleteTrash),
    takeLatest(DELETE_ALL, handleDeleteAll),
  ]);
}

export default TrashSaga;
