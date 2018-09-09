/*
 *
 * Sidebar reducer
 * 
 * configure in store/rootReducer
 */

import { DEFAULT_ACTION } from "./constants";

const initialState = {
  myProperty: "",
};

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default sidebarReducer;
