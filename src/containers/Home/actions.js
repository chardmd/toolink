import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED
} from "./constants";

export function getLinkData(targetUrl) {
  return {
    type: GET_LINK_DATA,
    targetUrl
  };
}

export function getLinkDataSuccess(data) {
  return {
    type: GET_LINK_DATA_SUCCESS,
    data
  };
}

export function getLinkDataFailed(err) {
  return {
    type: GET_LINK_DATA_FAILED,
    err
  };
}
