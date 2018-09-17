/*
 *
 * Links saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { push } from "connected-react-router";
import { API } from "aws-amplify";

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

import { displayAlert, setLoading } from "../App/actions";

function* handleGetCategoryLinks({ categoryId }) {
  try {
    yield put(setLoading(true));
    const response = yield call(
      [API, API.get],
      "toolink",
      `/links/categories/${categoryId}`
    );
    yield put(getCategoryLinksSuccess(response));
    yield put(setLoading(false));
  } catch (e) {
    yield put(getCategoryLinksFailed(e));
  }
}

function* handleSaveLink({ link, categoryId, isFavorite }) {
  try {
    yield put(setLoading(true));
    const response = yield call([API, API.post], "toolink", "/links", {
      body: {
        url: link,
        categoryId,
        isFavorite,
      },
    });
    yield put(saveLinkSuccess(response, isFavorite));
    yield put(setLoading(false));
    yield put(displayAlert("Link successfully saved", true));
  } catch (e) {
    yield put(saveLinkFailed(e));
  }
}

function* handleRemoveLink({ id }) {
  try {
    yield call([API, API.put], "toolink", `/links/${id}`, {
      body: {
        isActive: false,
      },
    });
    yield put(removeLinkSuccess(id));
    yield put(displayAlert("Link successfully removed", true));
  } catch (e) {
    yield put(removeLinkFailed(e));
    yield put(displayAlert(e.message, true));
  }
}

function* handleBookmarkLink({ id, status }) {
  try {
    yield call([API, API.put], "toolink", `/links/${id}`, {
      body: {
        isFavourite: !status,
      },
    });
    yield put(bookmarkLinkSuccess(id, status));
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
