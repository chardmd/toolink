import { takeLatest, put, all } from "redux-saga/effects";
//import axios from "axios";
import {
  GET_LINK_DATA,
  GET_CATEGORIES,
  SAVE_LINK,
  REMOVE_LINK,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  RENAME_CATEGORY
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
  renameCategorySuccess,
  renameCategoryFailed
} from "./actions";

import data from "./data.json";
import newData from "./new.json";
import categories from "./categories.json";

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

function* handleSaveLink({ link }) {
  try {
    console.table({ link });
    yield put(saveLinkSuccess(newData));
  } catch (e) {
    yield put(saveLinkFailed(e));
  }
}

function* handleRemoveLink({ id }) {
  try {
    yield put(removeLinkSuccess(id));
  } catch (e) {
    yield put(removeLinkFailed(e));
  }
}

function* handleAddCategory({ category }) {
  try {
    yield put(addCategorySuccess({ id: 10, name: category }));
  } catch (e) {
    yield put(addCategoryFailed(e));
  }
}

function* handleRemoveCategory({ id }) {
  try {
    yield put(removeCategorySuccess(id));
  } catch (e) {
    yield put(removeCategoryFailed(e));
  }
}

function* handleRenameCategory({ id, text }) {
  try {
    yield put(renameCategorySuccess(id, text));
  } catch (e) {
    yield put(renameCategoryFailed(e));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(GET_LINK_DATA, handleGetLinkData),
    takeLatest(GET_CATEGORIES, handleGetCategories),
    takeLatest(SAVE_LINK, handleSaveLink),
    takeLatest(REMOVE_LINK, handleRemoveLink),
    takeLatest(ADD_CATEGORY, handleAddCategory),
    takeLatest(REMOVE_CATEGORY, handleRemoveCategory),
    takeLatest(RENAME_CATEGORY, handleRenameCategory)
  ]);
}

export default rootSaga;
