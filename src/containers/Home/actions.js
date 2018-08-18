import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED,
  LOAD_HOME,
} from "./constants";

export function getLinkData(category) {
  return {
    type: GET_LINK_DATA,
    category,
  };
}

export function getLinkDataSuccess(data) {
  return {
    type: GET_LINK_DATA_SUCCESS,
    data,
  };
}

export function getLinkDataFailed(err) {
  return {
    type: GET_LINK_DATA_FAILED,
    err,
  };
}

export function saveLink(link) {
  return {
    type: SAVE_LINK,
    link,
  };
}

export function saveLinkSuccess(data) {
  return {
    type: SAVE_LINK_SUCCESS,
    data,
  };
}

export function saveLinkFailed(err) {
  return {
    type: SAVE_LINK_FAILED,
    err,
  };
}

export function removeLink(id) {
  return {
    type: REMOVE_LINK,
    id,
  };
}

export function removeLinkSuccess(id) {
  return {
    type: REMOVE_LINK_SUCCESS,
    id,
  };
}

export function removeLinkFailed(err) {
  return {
    type: REMOVE_LINK_FAILED,
    err,
  };
}

export function loadHome() {
  return {
    type: LOAD_HOME,
  };
}
