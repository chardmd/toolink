import { takeLatest, put, all } from "redux-saga/effects";

import {
  GET_LINK_DATA,
  GET_CATEGORIES,
  SAVE_LINK,
  REMOVE_LINK,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RENAME_CATEGORY,
  LOAD_HOME,
} from "./constants";
import {
  getLinkDataSuccess,
  getLinkDataFailed,
  getCategoriesSuccess,
  getCategoriesFailed,
  saveLinkSuccess,
  saveLinkFailed,
  removeLinkSuccess,
  removeLinkFailed,
  addCategorySuccess,
  addCategoryFailed,
  removeCategorySuccess,
  removeCategoryFailed,
  renameCategorySuccess, renameCategoryFailed
} from "./actions";

  import { displayAlert } from "../App/actions";

import data from "./data.json";
import newData from "./new.json";
import categories from "./categories.json";

  function* handleLoadHome() {
  yield handleGetCategories();
  yield handleGetLinkData(categories[0]);
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

function* handleGetLinkData({ category }) {
  try {
    // const response = yield call([axios, axios.get], url);
    // console.log("response", response.data);
    yield put(getLinkDataSuccess(data));
  } catch (e) {
    yield put(getLinkDataFailed(e));
  }
}

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

function* rootSaga() {
  yield all([
    takeLatest(LOAD_HOME, handleLoadHome),
    takeLatest(GET_LINK_DATA, handleGetLinkData),
    takeLatest(GET_CATEGORIES, handleGetCategories),
    takeLatest(SAVE_LINK, handleSaveLink),
    takeLatest(REMOVE_LINK, handleRemoveLink),
    takeLatest(ADD_CATEGORY, handleAddCategory),
    takeLatest(REMOVE_CATEGORY, handleRemoveCategory),
    takeLatest(RENAME_CATEGORY, handleRenameCategory),
  ]);
}

export default rootSaga;
