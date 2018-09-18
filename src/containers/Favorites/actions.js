/*
 *
 * Favorites actions
 *
 */

import {
  GET_FAVORITES,
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAILED,
  REMOVE_FAVORITES,
  REMOVE_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_FAILED,
} from "./constants";

export function getFavorites() {
  return {
    type: GET_FAVORITES,
  };
}

export function getFavoritesSuccess(data) {
  return {
    type: GET_FAVORITES_SUCCESS,
    data,
  };
}

export function getFavoritesFailed(err) {
  return {
    type: GET_FAVORITES_FAILED,
    err,
  };
}

export function removeFavorites(id) {
  return {
    type: REMOVE_FAVORITES,
    id,
  };
}

export function removeFavoritesSuccess(id) {
  return {
    type: REMOVE_FAVORITES_SUCCESS,
    id,
  };
}

export function removeFavoritesFailed(err) {
  return {
    type: REMOVE_FAVORITES_FAILED,
    err,
  };
}
