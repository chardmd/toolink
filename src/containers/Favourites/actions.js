/*
 *
 * Favourites actions
 *
 */

import {
  GET_FAVOURITES,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAILED,
} from "./constants";

export function getFavourites() {
  return {
    type: GET_FAVOURITES,
  };
}

export function getFavouritesSuccess(data) {
  return {
    type: GET_FAVOURITES_SUCCESS,
    data,
  };
}

export function getFavouritesFailed(err) {
  return {
    type: GET_FAVOURITES_FAILED,
    err,
  };
}
