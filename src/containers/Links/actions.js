/*
 *
 * Links actions
 *
 */

import {
  GET_CATEGORY_LINKS,
  GET_CATEGORY_LINKS_SUCCESS,
  GET_CATEGORY_LINKS_FAILED,
  SAVE_LINK,
  SAVE_LINK_SUCCESS,
  SAVE_LINK_FAILED,
  REMOVE_LINK,
  REMOVE_LINK_SUCCESS,
  REMOVE_LINK_FAILED,
  BOOKMARK_LINK,
  BOOKMARK_LINK_SUCCESS,
  BOOKMARK_LINK_FAILED,
} from "./constants";

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

export function saveLink(link, categoryId) {
  return {
    type: SAVE_LINK,
    link,
    categoryId,
  };
}

export function saveLinkSuccess(data) {
  return {
    type: SAVE_LINK_SUCCESS,
    data,
  };
}

export function saveLinkFailed(err) {
  return {
    type: SAVE_LINK_FAILED,
    err,
  };
}

export function removeLink(id) {
  return {
    type: REMOVE_LINK,
    id,
  };
}

export function removeLinkSuccess(id) {
  return {
    type: REMOVE_LINK_SUCCESS,
    id,
  };
}

export function removeLinkFailed(err) {
  return {
    type: REMOVE_LINK_FAILED,
    err,
  };
}

export function bookmarkLink(id, status) {
  return {
    type: BOOKMARK_LINK,
    id,
    status,
  };
}

export function bookmarkLinkSuccess(id, status) {
  return {
    type: BOOKMARK_LINK_SUCCESS,
    id,
    status,
  };
}

export function bookmarkLinkFailed(err) {
  return {
    type: BOOKMARK_LINK_FAILED,
    err,
  };
}
