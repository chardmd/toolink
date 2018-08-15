import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import { FORGOT_PASSWORD, FORGOT_PASSWORD_CODE } from "./constants";
import {
  setLoading,
  setAlertOpen,
  forgotPasswordSuccess,
  forgotPasswordFailed,
} from "./actions";

import { setAuthenticated } from "../App/actions";
import { signInSuccess, signInFailed } from "../Login/actions";

function* handleForgotPassword({ email }) {
  try {
    yield put(setLoading(true));
    yield call([Auth, Auth.forgotPassword], email);
    yield put(forgotPasswordSuccess(true));
  } catch (e) {
    console.error(e);
    yield put(setAlertOpen(true));
    yield put(forgotPasswordFailed(e));
  }
  yield put(setLoading(false));
}

function* handleForgotPasswordCode({ email, confirmationCode, password }) {
  try {
    yield put(setLoading(true));
    yield call(
      [Auth, Auth.forgotPasswordSubmit],
      email,
      confirmationCode,
      password
    );

    //call sign in
    const response = yield call([Auth, Auth.signIn], email, password);
    yield put(signInSuccess(response));
    yield put(setAuthenticated(true));
  } catch (e) {
    console.error(e);
    yield put(setAlertOpen(true));
    yield put(signInFailed(e));
  }
  yield put(setLoading(false));
}

function* rootSaga() {
  yield all([
    takeLatest(FORGOT_PASSWORD, handleForgotPassword),
    takeLatest(FORGOT_PASSWORD_CODE, handleForgotPasswordCode),
  ]);
}

export default rootSaga;
