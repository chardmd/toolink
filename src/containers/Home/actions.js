import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED
} from "./constants";

export function getLinkData(category) {
  return {
    type: GET_LINK_DATA,
    category
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

export function getCategories() {
  return {
    type: GET_CATEGORIES
  };
}

export function getCategoriesSuccess(data) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    data
  };
}

export function getCategoriesFailed(err) {
  return {
    type: GET_CATEGORIES_FAILED,
    err
  };
}
