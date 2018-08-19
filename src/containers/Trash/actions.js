/*
 *
 * Trash actions
 *
 */

import { GET_TRASH, GET_TRASH_FAILED, GET_TRASH_SUCCESS } from "./constants";

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
