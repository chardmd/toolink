/*
 *
 * Categories saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";
import { push } from "connected-react-router";

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

function* handleGetCategories() {
  try {
    const response = yield call([API, API.get], "toolink", "/categories");
    yield put(getCategoriesSuccess(response));
  } catch (e) {
    yield put(getCategoriesFailed(e));
  }
}

function* handleAddCategory({ category }) {
  try {
    const response = yield call([API, API.post], "toolink", "/categories", {
      body: {
        categoryName: category,
      },
    });
    yield put(addCategorySuccess(response));
    yield put(displayAlert("Category successfully added", true));
  } catch (e) {
    yield put(addCategoryFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleRemoveCategory({ id }) {
  try {
    yield call([API, API.del], "toolink", `/categories/${id}`);
    yield put(removeCategorySuccess(id));
    yield put(displayAlert("Category successfully removed", true));
    yield put(push("/"));
  } catch (e) {
    yield put(removeCategoryFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleRenameCategory({ id, categoryName }) {
  try {
    yield call([API, API.put], "toolink", `/categories/${id}`, {
      body: {
        categoryName: categoryName,
      },
    });
    yield put(renameCategorySuccess(id, categoryName));
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
export { handleGetCategories };
