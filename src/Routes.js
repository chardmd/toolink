import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./containers/NotFound";
import asyncComponent from "./components/AsyncComponent";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

const AsyncFavorites = asyncComponent(() => import("./containers/Favorites"));
const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncMaintenance = asyncComponent(() =>
  import("./containers/Maintenance")
);
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncForgotPassword = asyncComponent(() =>
  import("./containers/ForgotPassword")
);
const AsyncSubscription = asyncComponent(() =>
  import("./containers/Subscription")
);

export default ({ childProps }) => (
  <Switch>
    <AuthenticatedRoute
      path="/"
      exact
      component={AsyncFavorites}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/categories/:categoryId"
      exact
      component={AsyncHome}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/premium"
      exact
      component={AsyncSubscription}
      props={childProps}
    />
    <AuthenticatedRoute
      path="/maintenance/trash"
      component={AsyncMaintenance}
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
