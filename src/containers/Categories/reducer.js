/*
 *
 * Categories reducer
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

const initialState = [];

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return state;
    case GET_CATEGORIES_SUCCESS:
      return action.data;
    case GET_CATEGORIES_FAILED:
      return state;
    case ADD_CATEGORY:
      return state;
    case ADD_CATEGORY_SUCCESS:
      return [...state, action.data];
    case ADD_CATEGORY_FAILED:
      return state;
    case REMOVE_CATEGORY:
      return state;
    case REMOVE_CATEGORY_SUCCESS:
      const catId = action.id;
      return state.filter(i => i.categoryId !== catId);
    case REMOVE_CATEGORY_FAILED:
      return state;
    case RENAME_CATEGORY:
      return state;
    case RENAME_CATEGORY_SUCCESS:
      return renameCategory(state, action.id, action.categoryName);
    case RENAME_CATEGORY_FAILED:
      return state;
    default:
      return state;
  }
}

const renameCategory = (state, id, categoryName) => {
  let category = state.find(c => c.categoryId === id);
  category = { ...category, categoryName: categoryName };
  const categories = state.reduce((obj, item) => {
    if (category.categoryId === item.categoryId) {
      obj = obj.concat(category);
    } else {
      obj = obj.concat(item);
    }
    return obj;
  }, []);
  return categories;
};

export default categoriesReducer;
