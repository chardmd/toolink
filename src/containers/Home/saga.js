import { takeLatest, call, put, all } from "redux-saga/effects";
import axios from "axios";
import { GET_LINK_DATA, GET_CATEGORIES } from "./constants";
import {
  getLinkDataSuccess,
  getLinkDataFailed,
  getCategoriesSuccess,
  getCategoriesFailed
} from "./actions";

import data from "./data.json";
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

function* rootSaga() {
  yield all([
    takeLatest(GET_LINK_DATA, handleGetLinkData),
    takeLatest(GET_CATEGORIES, handleGetCategories)
  ]);
}

export default rootSaga;
