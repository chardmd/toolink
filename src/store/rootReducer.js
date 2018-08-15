import { combineReducers } from "redux";

import { LOGOUT } from "../containers/App/constants";
import homeReducer from "../containers/Home/reducer";
import appReducer from "../containers/App/reducer";
import forgotPasswordReducer from "../containers/ForgotPassword/reducer";
import loginReducer from "../containers/Login/reducer";
import signUpReducer from "../containers/Signup/reducer";

const mainReducer = combineReducers({
  home: homeReducer,
  app: appReducer,
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  signUp: signUpReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return mainReducer(state, action);
};

export default rootReducer;
