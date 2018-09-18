/*
 *
 * Favorites saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { GET_FAVORITES, REMOVE_FAVORITES } from "./constants";
import {
  getFavoritesSuccess,
  getFavoritesFailed,
  removeFavoritesSuccess,
  removeFavoritesFailed,
} from "./actions";

import { setLoading } from "../App/actions";

function* handleGetFavorites() {
  try {
    yield put(setLoading(true));
    const response = yield call([API, API.get], "toolink", "/favorites");
    yield put(getFavoritesSuccess(response));
    yield put(setLoading(false));
  } catch (e) {
    yield put(getFavoritesFailed(e));
  }
}

function* handleRemoveFavorites({ id }) {
  try {
    yield call([API, API.put], "toolink", `/links/${id}`, {
      body: {
        isFavorite: false,
      },
    });
    yield put(removeFavoritesSuccess(id));
  } catch (e) {
    yield put(removeFavoritesFailed(e));
  }
}

function* FavoritesSaga() {
  yield all([
    takeLatest(GET_FAVORITES, handleGetFavorites),
    takeLatest(REMOVE_FAVORITES, handleRemoveFavorites),
  ]);
}

export default FavoritesSaga;
export { handleGetFavorites };
