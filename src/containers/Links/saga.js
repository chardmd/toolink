/*
 *
 * Links saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, put, all } from "redux-saga/effects";
import { push } from "connected-react-router";

import {
  GET_CATEGORY_LINKS,
  SAVE_LINK,
  REMOVE_LINK,
  BOOKMARK_LINK,
} from "./constants";

import {
  getCategoryLinksSuccess,
  getCategoryLinksFailed,
  saveLinkSuccess,
  saveLinkFailed,
  removeLinkSuccess,
  removeLinkFailed,
  bookmarkLinkSuccess,
  bookmarkLinkFailed,
} from "./actions";

import { displayAlert } from "../App/actions";
import newData from "./new.json";

import data from "./data.json";

function* handleGetCategoryLinks({ categoryId }) {
  try {
    yield put(getCategoryLinksSuccess(data));
    yield put(push(`/categories/${categoryId}`));
  } catch (e) {
    yield put(getCategoryLinksFailed(e));
  }
}

function* handleSaveLink({ link, categoryId }) {
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

function* handleBookmarkLink({ id }) {
  try {
    yield put(bookmarkLinkSuccess(id, newData));
  } catch (e) {
    yield put(bookmarkLinkFailed(e));
  }
}

function* LinksSaga() {
  yield all([
    takeLatest(GET_CATEGORY_LINKS, handleGetCategoryLinks),
    takeLatest(SAVE_LINK, handleSaveLink),
    takeLatest(REMOVE_LINK, handleRemoveLink),
    takeLatest(BOOKMARK_LINK, handleBookmarkLink),
  ]);
}

export default LinksSaga;
