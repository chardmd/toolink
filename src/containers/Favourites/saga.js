/*
 *
 * Favourites saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { GET_FAVOURITES } from "./constants";
import { getFavouritesSuccess, getFavouritesFailed } from "./actions";

function* handleGetFavourites() {
  try {
    const response = yield call([API, API.get], "toolink", "/favourites");
    yield put(getFavouritesSuccess(response));
  } catch (e) {
    yield put(getFavouritesFailed(e));
  }
}

function* FavouritesSaga() {
  yield all([takeLatest(GET_FAVOURITES, handleGetFavourites)]);
}

export default FavouritesSaga;
