import { takeLatest, put, all } from "redux-saga/effects";

import { TRIGGER_SAVE_CATEGORY } from "./constants";

import { handleAddCategory } from "../Categories/saga";
import { setLoading } from "./actions";

function* handleTriggerSaveCategory({ category }) {
  yield put(setLoading(true));
  yield handleAddCategory({ category });
  yield put(setLoading(false));
}

function* rootSaga() {
  yield all([takeLatest(TRIGGER_SAVE_CATEGORY, handleTriggerSaveCategory)]);
}

export default rootSaga;
