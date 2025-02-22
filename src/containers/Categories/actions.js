/*
 *
 * Categories actions
 *
 */

import {
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
} from "./constants";

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

export function renameCategory(id, categoryName) {
  return {
    type: RENAME_CATEGORY,
    id,
    categoryName,
  };
}

export function renameCategorySuccess(id, categoryName) {
  return {
    type: RENAME_CATEGORY_SUCCESS,
    id,
    categoryName,
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
