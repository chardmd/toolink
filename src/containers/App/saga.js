import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";
import { push } from "connected-react-router";

import {
  LOGOUT,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RENAME_CATEGORY,
  GET_TRASH,
  GET_CATEGORIES,
} from "./constants";
import {
  setAuthenticating,
  setAuthenticated,
  displayAlert,
  addCategorySuccess,
  addCategoryFailed,
  removeCategorySuccess,
  removeCategoryFailed,
  renameCategorySuccess,
  renameCategoryFailed,
  getTrashSuccess,
  getTrashFailed,
  getCategoriesSuccess,
  getCategoriesFailed,
} from "./actions";

import categories from "./categories.json";
import trash from "./trash.json";

function* handleLogout() {
  try {
    yield call([Auth, Auth.signOut]);
    yield put(setAuthenticated(false));
    yield put(push("/login"));
  } catch (e) {
    console.error(e);
  }
  yield put(setAuthenticating(false));
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

function* rootSaga() {
  yield all([
    takeLatest(LOGOUT, handleLogout),
    takeLatest(ADD_CATEGORY, handleAddCategory),
    takeLatest(REMOVE_CATEGORY, handleRemoveCategory),
    takeLatest(RENAME_CATEGORY, handleRenameCategory),
    takeLatest(GET_TRASH, handleGetTrash),
    takeLatest(GET_CATEGORIES, handleGetCategories),
  ]);
}

export default rootSaga;
