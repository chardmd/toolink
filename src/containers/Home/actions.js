import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED
} from "./constants";

export function getLinkData(index, targetUrl) {
  return {
    type: GET_LINK_DATA,
    index,
    targetUrl
  };
}

export function getLinkDataSuccess(index, data) {
  return {
    type: GET_LINK_DATA_SUCCESS,
    index,
    data
  };
}

export function getLinkDataFailed(err) {
  return {
    type: GET_LINK_DATA_FAILED,
    err
  };
}
