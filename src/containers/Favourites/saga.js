/*
 *
 * Favourites saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { API } from "aws-amplify";

import { GET_FAVOURITES, REMOVE_FAVOURITES } from "./constants";
import {
  getFavouritesSuccess,
  getFavouritesFailed,
  removeFavouritesSuccess,
  removeFavouritesFailed,
} from "./actions";

function* handleGetFavourites() {
  try {
    const response = yield call([API, API.get], "toolink", "/favourites");
    yield put(getFavouritesSuccess(response));
  } catch (e) {
    yield put(getFavouritesFailed(e));
  }
}

function* handleRemoveFavourites({ id }) {
  try {
    yield call([API, API.put], "toolink", `/links/${id}`, {
      body: {
        isFavourite: false,
      },
    });
    yield put(removeFavouritesSuccess(id));
  } catch (e) {
    yield put(removeFavouritesFailed(e));
  }
}

function* FavouritesSaga() {
  yield all([
    takeLatest(GET_FAVOURITES, handleGetFavourites),
    takeLatest(REMOVE_FAVOURITES, handleRemoveFavourites),
  ]);
}

export default FavouritesSaga;
export { handleGetFavourites };
