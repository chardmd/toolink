/*
 *
 * Signup saga
 * 
 * configure in store/rootSaga
 */

import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import { SIGN_UP, CONFIRM_SIGN_UP } from "./constants";
import {
  setLoading,
  setAlertOpen,
  signUpSuccess,
  signUpFailed,
  confirmSignUpSuccess,
  confirmSignUpFailed,
} from "./actions";

import { setAuthenticated } from "../App/actions";
import { signInSuccess, signInFailed } from "../Login/actions";

function* handleSignUp({ email, password }) {
  try {
    yield put(setLoading(true));
    yield call([Auth, Auth.signUp], email, password);
    yield put(signUpSuccess(true));
  } catch (e) {
    console.error(e);
    yield put(setAlertOpen(true));
    yield put(signUpFailed(e));
  }
  yield put(setLoading(false));
}

function* handleConfirmSignUp({ email, confirmationCode, password }) {
  try {
    yield put(setLoading(true));
    yield call([Auth, Auth.confirmSignUp], email, confirmationCode);
    yield put(confirmSignUpSuccess(true));

    //call sign in
    const response = yield call([Auth, Auth.signIn], email, password);
    yield put(signInSuccess(response));
    yield put(setAuthenticated(true));
  } catch (e) {
    console.error(e);
    yield put(confirmSignUpFailed(e));
    yield put(signInFailed(e));
    yield put(setAlertOpen(true));
  }
  yield put(setLoading(false));
}

function* SignupSaga() {
  yield all([
    takeLatest(SIGN_UP, handleSignUp),
    takeLatest(CONFIRM_SIGN_UP, handleConfirmSignUp),
  ]);
}

export default SignupSaga;
