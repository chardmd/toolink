import { all, fork } from "redux-saga/effects";
import homeSaga from "../containers/Home/saga";
import appSaga from "../containers/App/saga";
import loginSaga from "../containers/Login/saga";
import forgotPasswordSaga from "../containers/ForgotPassword/saga";
import signUpSaga from "../containers/Signup/saga";
import categoriesSaga from "../containers/Categories/saga";
import linksSaga from "../containers/Links/saga";
import maintenanceSaga from "../containers/Maintenance/saga";
import favoritesSaga from "../containers/Favorites/saga";
import sidebarSaga from "../containers/Sidebar/saga";

export default function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(appSaga),
    fork(loginSaga),
    fork(forgotPasswordSaga),
    fork(signUpSaga),
    fork(categoriesSaga),
    fork(linksSaga),
    fork(maintenanceSaga),
    fork(favoritesSaga),
    fork(sidebarSaga),
  ]);
}
