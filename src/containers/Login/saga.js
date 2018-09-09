import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";
import { fbAPI } from "../../libs/utils";

import {
  SIGN_IN,
  GOOGLE_SIGN_IN,
  FACEBOOK_SIGN_IN,
  GET_AUTHENTICATED_USER,
} from "./constants";
import {
  signInSuccess,
  signInFailed,
  googleSignInSuccess,
  googleSignInFailed,
  facebookSignInSuccess,
  facebookSignInFailed,
  getAuthenticatedUserSuccess,
  getAuthenticatedUserFailed,
} from "./actions";

import { getCategories } from "../Categories/actions";
import { getFavourites } from "../Favourites/actions";

import {
  setAuthenticating,
  setAuthenticated,
  setLoading,
  displayAlert,
} from "../App/actions";

function* handleSignIn({ data }) {
  try {
    yield put(setLoading(true));
    const { email, password } = data;
    const response = yield call([Auth, Auth.signIn], email, password);
    yield put(signInSuccess(response));
    yield put(getCategories());
    yield put(getFavourites());
    yield put(setAuthenticated(true));
  } catch (e) {
    yield put(displayAlert(e.message, true));
    yield put(signInFailed(e));
  }
  yield put(setLoading(false));
  yield put(setAuthenticating(false));
}

function* handleGoogleSignIn({ data }) {
  try {
    yield put(setLoading(true));
    const { id_token, expires_at } = data.getAuthResponse();
    const profile = data.getBasicProfile();
    const user = {
      email: profile.getEmail(),
      name: profile.getName(),
    };

    const response = yield call(
      [Auth, Auth.federatedSignIn],
      "google",
      {
        token: id_token,
        expires_at: expires_at,
      },
      user
    );
    const result = {
      id: response.data.IdentityId,
      ...user,
    };
    yield put(googleSignInSuccess(result));
    yield put(getFavourites());
    yield put(getCategories());
    yield put(setAuthenticated(true));
  } catch (e) {
    yield put(displayAlert(e.message, true));
    yield put(googleSignInFailed(e));
  }
  yield put(setLoading(false));
  yield put(setAuthenticating(false));
}

function* handleFacebookSignIn({ data }) {
  try {
    yield put(setLoading(true));
    const { accessToken, expiresIn } = data;
    const date = new Date();
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }
    const fbResponse = yield call(fbAPI, "/me");
    const user = {
      name: fbResponse.name,
    };

    const response = yield call(
      [Auth, Auth.federatedSignIn],
      "facebook",
      { token: accessToken, expires_at },
      user
    );
    const result = {
      id: response.data.IdentityId,
      ...user,
    };
    yield put(facebookSignInSuccess(result));
    yield put(getFavourites());
    yield put(getCategories());
    yield put(setAuthenticated(true));
  } catch (e) {
    yield put(displayAlert(e.message, true));
    yield put(facebookSignInFailed(e));
  }

  yield put(setLoading(false));
  yield put(setAuthenticating(false));
}

function* handleGetAuthenticatedUser() {
  try {
    const response = yield call([Auth, Auth.currentAuthenticatedUser]);
    yield put(getAuthenticatedUserSuccess(response));
    yield put(getCategories());
    yield put(setAuthenticated(true));
  } catch (e) {
    console.error(e);
    yield put(getAuthenticatedUserFailed(e));
  }

  yield put(setLoading(false));
  yield put(setAuthenticating(false));
}

function* rootSaga() {
  yield all([
    takeLatest(SIGN_IN, handleSignIn),
    takeLatest(GOOGLE_SIGN_IN, handleGoogleSignIn),
    takeLatest(FACEBOOK_SIGN_IN, handleFacebookSignIn),
    takeLatest(GET_AUTHENTICATED_USER, handleGetAuthenticatedUser),
  ]);
}

export default rootSaga;
