import { takeLatest, call, put, all } from "redux-saga/effects";
import { Auth } from "aws-amplify";
import { push } from "connected-react-router";

import { LOGOUT } from "./constants";
import { setAuthenticating, setAuthenticated } from "./actions";

function* handleLogout() {
  try {
    yield call([Auth, Auth.signOut]);
    yield put(setAuthenticated(false));
    yield put(push("/login"));
  } catch (e) {
    console.error(e);
  }
  yield put(setAuthenticating(false));
}

function* rootSaga() {
  yield all([takeLatest(LOGOUT, handleLogout)]);
}

export default rootSaga;
