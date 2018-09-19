/*
 *
 * Sidebar actions
 *
 */

import { TRIGGER_SAVE_CATEGORY, SET_LOADING } from "./constants";

export function triggerSaveCategory(category) {
  return {
    type: TRIGGER_SAVE_CATEGORY,
    category,
  };
}

export function setLoading(status) {
  return {
    type: SET_LOADING,
    status,
  };
}
