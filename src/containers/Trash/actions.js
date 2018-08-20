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
