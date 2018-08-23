import { all, fork } from "redux-saga/effects";
import homeSaga from "../containers/Home/saga";
import appSaga from "../containers/App/saga";
import loginSaga from "../containers/Login/saga";
import forgotPasswordSaga from "../containers/ForgotPassword/saga";
import SignUpSaga from "../containers/Signup/saga";
import CategoriesSaga from "../containers/Categories/saga";
import LinksSaga from "../containers/Links/saga";
import MaintenanceSaga from "../containers/Maintenance/saga";

export default function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(appSaga),
    fork(loginSaga),
    fork(forgotPasswordSaga),
    fork(SignUpSaga),
    fork(CategoriesSaga),
    fork(LinksSaga),
    fork(MaintenanceSaga),
  ]);
}
