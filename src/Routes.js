import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import asyncComponent from "./components/AsyncComponent";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncTrash = asyncComponent(() => import("./containers/Trash"));
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncForgotPassword = asyncComponent(() =>
  import("./containers/ForgotPassword")
);

export default ({ childProps }) => (
  <Switch>
    <AuthenticatedRoute
      path="/categories/:categoryId?"
      component={AsyncHome}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/maintenance/trash"
      component={AsyncTrash}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={AsyncLogin}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={AsyncSignup}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/forgot"
      exact
      component={AsyncForgotPassword}
      props={childProps}
    />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
