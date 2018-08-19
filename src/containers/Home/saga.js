import { takeLatest, put, all } from "redux-saga/effects";

import { SAVE_LINK, REMOVE_LINK, LOAD_HOME } from "./constants";
import {
  saveLinkSuccess,
  saveLinkFailed,
  removeLinkSuccess,
  removeLinkFailed,
} from "./actions";

import { displayAlert } from "../App/actions";
import newData from "./new.json";

function* handleLoadHome() {}

function* handleSaveLink({ link }) {
  try {
    console.table({ link });
    yield put(saveLinkSuccess(newData));
    yield put(displayAlert("Link successfully saved", true));
  } catch (e) {
    yield put(saveLinkFailed(e));
  }
}

function* handleRemoveLink({ id }) {
  try {
    yield put(removeLinkSuccess(id));
    yield put(displayAlert("Link successfully removed", true));
  } catch (e) {
    yield put(removeLinkFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(LOAD_HOME, handleLoadHome),
    takeLatest(SAVE_LINK, handleSaveLink),
    takeLatest(REMOVE_LINK, handleRemoveLink),
  ]);
}

export default rootSaga;
