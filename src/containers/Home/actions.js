import {
  GET_LINK_DATA,
  GET_LINK_DATA_SUCCESS,
  GET_LINK_DATA_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED
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

export function saveLink(link) {
  return {
    type: SAVE_LINK,
    link
  };
}

export function saveLinkSuccess(id) {
  return {
    type: SAVE_LINK_SUCCESS,
    id
  };
}

export function saveLinkFailed(err) {
  return {
    type: SAVE_LINK_FAILED,
    err
  };
}

export function removeLink(id) {
  return {
    type: REMOVE_LINK,
    id
  };
}

export function removeLinkSuccess(id) {
  return {
    type: REMOVE_LINK_SUCCESS,
    id
  };
}

export function removeLinkFailed(err) {
  return {
    type: REMOVE_LINK_FAILED,
    err
  };
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  };
}

export function addCategorySuccess(data) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data
  };
}

export function addCategoryFailed(err) {
  return {
    type: ADD_CATEGORY_FAILED,
    err
  };
}
