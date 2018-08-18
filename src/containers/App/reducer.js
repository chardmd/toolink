import {
  LOGOUT,
  SET_AUTHENTICATED,
  SET_AUTHENTICATING,
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
  GET_TRASH,
  GET_TRASH_SUCCESS,
  GET_TRASH_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
} from "./constants";

const INITIAL_STATE = {
  isAuthenticating: true,
  isAuthenticated: false,
  isLoading: false,
  err: null,
  alertMessage: "",
  alertOpen: false,
  categories: [],
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.status,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.status,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.status,
      };
    case LOGOUT:
      return state;
    case DISPLAY_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertOpen: action.status,
      };
    case ADD_CATEGORY:
      return state;
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.data],
      };
    case ADD_CATEGORY_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case REMOVE_CATEGORY:
      return state;
    case REMOVE_CATEGORY_SUCCESS:
      const catId = action.id;
      return {
        ...state,
        categories: state.categories.filter(i => i.id !== catId),
      };
    case REMOVE_CATEGORY_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case RENAME_CATEGORY:
      return state;
    case RENAME_CATEGORY_SUCCESS:
      return renameCategory(state, action.id, action.text);
    case RENAME_CATEGORY_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case GET_TRASH:
      return state;
    case GET_TRASH_SUCCESS:
      return {
        ...state,
        previewList: action.data,
      };
    case GET_TRASH_FAILED:
      return {
        ...state,
        err: action.err,
      };
    case GET_CATEGORIES:
      return state;
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.data,
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        err: action.err,
      };
    default:
      return state;
  }
};

const renameCategory = (state, id, text) => {
  let category = state.categories.find(c => c.id === id);
  category = { ...category, name: text };
  const categories = state.categories.reduce((obj, item) => {
    if (category.id === item.id) {
      obj = obj.concat(category);
    } else {
      obj = obj.concat(item);
    }
    return obj;
  }, []);
  return {
    ...state,
    categories,
  };
};

export default appReducer;
