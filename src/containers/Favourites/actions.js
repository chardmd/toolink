/*
 *
 * Favourites actions
 *
 */

import {
  GET_FAVOURITES,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAILED,
  REMOVE_FAVOURITES,
  REMOVE_FAVOURITES_SUCCESS,
  REMOVE_FAVOURITES_FAILED,
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

export function removeFavourites(id) {
  return {
    type: REMOVE_FAVOURITES,
    id,
  };
}

export function removeFavouritesSuccess(id) {
  return {
    type: REMOVE_FAVOURITES_SUCCESS,
    id,
  };
}

export function removeFavouritesFailed(err) {
  return {
    type: REMOVE_FAVOURITES_FAILED,
    err,
  };
}
