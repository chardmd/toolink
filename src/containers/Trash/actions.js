/*
 *
 * Trash actions
 *
 */

import {
  GET_TRASH,
  GET_TRASH_FAILED,
  GET_TRASH_SUCCESS,
  DELETE_TRASH,
  DELETE_TRASH_SUCCESS,
  DELETE_TRASH_FAILED,
  DELETE_ALL,
  DELETE_ALL_FAILED,
  DELETE_ALL_SUCCESS,
} from "./constants";

export function getTrash() {
  return {
    type: GET_TRASH,
  };
}

export function getTrashSuccess(data) {
  return {
    type: GET_TRASH_SUCCESS,
    data,
  };
}

export function getTrashFailed(err) {
  return {
    type: GET_TRASH_FAILED,
    err,
  };
}

export function deleteTrash(id) {
  return {
    type: DELETE_TRASH,
    id,
  };
}

export function deleteTrashSuccess(id) {
  return {
    type: DELETE_TRASH_SUCCESS,
    id,
  };
}

export function deleteTrashFailed(err) {
  return {
    type: DELETE_TRASH_FAILED,
    err,
  };
}

export function deleteAll() {
  return {
    type: DELETE_ALL,
  };
}

export function deleteAllSuccess() {
  return {
    type: DELETE_ALL_SUCCESS,
  };
}

export function deleteAllFailed(err) {
  return {
    type: DELETE_ALL_FAILED,
    err,
  };
}
