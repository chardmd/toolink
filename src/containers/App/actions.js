import {
  LOGOUT,
  SET_AUTHENTICATING,
  SET_AUTHENTICATED,
  SET_LOADING,
  DISPLAY_ALERT,
  ADD_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  RENAME_CATEGORY,
  RENAME_CATEGORY_SUCCESS,
  RENAME_CATEGORY_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  GET_TRASH,
  GET_TRASH_FAILED,
  GET_TRASH_SUCCESS,
  GET_CATEGORY_LINKS,
  GET_CATEGORY_LINKS_SUCCESS,
  GET_CATEGORY_LINKS_FAILED,
} from "./constants";

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function setAuthenticating(status) {
  return {
    type: SET_AUTHENTICATING,
    status,
  };
}

export function setAuthenticated(status) {
  return {
    type: SET_AUTHENTICATED,
    status,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING,
    status,
  };
}

export function displayAlert(message, status) {
  return {
    type: DISPLAY_ALERT,
    message,
    status,
  };
}

export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  };
}

export function addCategorySuccess(data) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data,
  };
}

export function addCategoryFailed(err) {
  return {
    type: ADD_CATEGORY_FAILED,
    err,
  };
}

export function removeCategory(id) {
  return {
    type: REMOVE_CATEGORY,
    id,
  };
}

export function removeCategorySuccess(id) {
  return {
    type: REMOVE_CATEGORY_SUCCESS,
    id,
  };
}

export function removeCategoryFailed(err) {
  return {
    type: REMOVE_CATEGORY_FAILED,
    err,
  };
}

export function renameCategory(id, text) {
  return {
    type: RENAME_CATEGORY,
    id,
    text,
  };
}

export function renameCategorySuccess(id, text) {
  return {
    type: RENAME_CATEGORY_SUCCESS,
    id,
    text,
  };
}

export function renameCategoryFailed(err) {
  return {
    type: RENAME_CATEGORY_FAILED,
    err,
  };
}

export function getCategories() {
  return {
    type: GET_CATEGORIES,
  };
}

export function getCategoriesSuccess(data) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    data,
  };
}

export function getCategoriesFailed(err) {
  return {
    type: GET_CATEGORIES_FAILED,
    err,
  };
}

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

export function getCategoryLinks(categoryId) {
  return {
    type: GET_CATEGORY_LINKS,
    categoryId,
  };
}

export function getCategoryLinksSuccess(data) {
  return {
    type: GET_CATEGORY_LINKS_SUCCESS,
    data,
  };
}

export function getCategoryLinksFailed(err) {
  return {
    type: GET_CATEGORY_LINKS_FAILED,
    err,
  };
}
