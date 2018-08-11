import { takeLatest, put, all } from "redux-saga/effects";
//import axios from "axios";
import {
  GET_LINK_DATA,
  GET_CATEGORIES,
  SAVE_LINK,
  REMOVE_LINK,
  ADD_CATEGORY
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
  addCategoryFailed
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

function* rootSaga() {
  yield all([
    takeLatest(GET_LINK_DATA, handleGetLinkData),
    takeLatest(GET_CATEGORIES, handleGetCategories),
    takeLatest(SAVE_LINK, handleSaveLink),
    takeLatest(REMOVE_LINK, handleRemoveLink),
    takeLatest(ADD_CATEGORY, handleAddCategory)
  ]);
}

export default rootSaga;
