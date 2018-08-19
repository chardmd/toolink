/*
 *
 * Categories saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, put, all } from "redux-saga/effects";

import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RENAME_CATEGORY,
  GET_CATEGORIES,
} from "./constants";
import {
  addCategorySuccess,
  addCategoryFailed,
  removeCategorySuccess,
  removeCategoryFailed,
  renameCategorySuccess,
  renameCategoryFailed,
  getCategoriesSuccess,
  getCategoriesFailed,
} from "./actions";

import { displayAlert } from "../App/actions";

import categories from "./categories.json";

function* handleGetCategories() {
  try {
    // let url = `https://micro-open-graph-ksguljmysl.now.sh/?url=${category}`;
    // const response = yield call([axios, axios.get], url);
    // console.log("response", response.data);
    yield put(getCategoriesSuccess(categories));
  } catch (e) {
    yield put(getCategoriesFailed(e));
  }
}

function* handleAddCategory({ category }) {
  try {
    yield put(addCategorySuccess({ id: 10, name: category }));
    yield put(displayAlert("Category successfully added", true));
  } catch (e) {
    yield put(addCategoryFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleRemoveCategory({ id }) {
  try {
    yield put(removeCategorySuccess(id));
    yield put(displayAlert("Category successfully removed", true));
  } catch (e) {
    yield put(removeCategoryFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleRenameCategory({ id, text }) {
  try {
    yield put(renameCategorySuccess(id, text));
    yield put(displayAlert("Category successfully updated", true));
  } catch (e) {
    yield put(renameCategoryFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* CategoriesSaga() {
  yield all([
    takeLatest(GET_CATEGORIES, handleGetCategories),
    takeLatest(ADD_CATEGORY, handleAddCategory),
    takeLatest(REMOVE_CATEGORY, handleRemoveCategory),
    takeLatest(RENAME_CATEGORY, handleRenameCategory),
  ]);
}

export default CategoriesSaga;
