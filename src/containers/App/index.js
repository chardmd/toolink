import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import { matchPath } from "react-router";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

//components
import NavBar from "../../components/NavBar";
import SimpleSnackbar from "../../components/SimpleSnackbar";

//containers
import Sidebar from "../../containers/Sidebar";

//actions
import { getAuthenticatedUser } from "../Login/actions";
import { logout, setAuthenticated, displayAlert } from "./actions";

import Routes from "../../Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
    };

    this.getActiveCategoryId = this.getActiveCategoryId.bind(this);
  }

  componentDidMount() {
    this.props.getAuthenticatedUser();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  renderToolbar() {
    return (
      <Toolbar className="toolbox">
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              this.onToggleStatus(true);
            }}
          >
            <Icon>link</Icon>
            &nbsp;
            <span>Add Link</span>
          </Button>
        </div>
      </Toolbar>
    );
  }

  getActiveCategoryId() {
    const match = matchPath(this.props.location.pathname, {
      path: "/categories/:categoryId",
      exact: true,
      strict: false,
    });
    return match === null ? "0" : match.params.categoryId;
  }

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.props.setAuthenticated,
    };
    // get categoryId from the url
    const activeCategoryId = this.getActiveCategoryId();
    return (
      !this.props.isAuthenticating && (
        <div className="App">
          <div className="root">
            <NavBar
              isAuthenticated={this.props.isAuthenticated}
              handleLogout={this.props.logout}
              handleDrawerToggle={this.handleDrawerToggle}
              mobileOpen={this.state.mobileOpen}
            />
            {this.props.isAuthenticated && (
              <Sidebar
                activeCategoryId={activeCategoryId}
                mobileOpen={this.state.mobileOpen}
                handleDrawerToggle={this.handleDrawerToggle}
              />
            )}
            <main className="content">
              <div className="toolbar" />
              <Routes childProps={childProps} />
              <SimpleSnackbar
                message={this.props.alertMessage}
                open={this.props.alertOpen}
                toggleOpen={this.props.displayAlert}
              />
            </main>
          </div>
          {!this.props.isAuthenticated && (
            <footer>
              <p>
                <Link to="/" className="secondary">
                  toolink.co
                </Link>
              </p>
              <p>© 2018 All rights reserved</p>
            </footer>
          )}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticating: state.app.isAuthenticating,
  isAuthenticated: state.app.isAuthenticated,
  alertOpen: state.app.alertOpen,
  alertMessage: state.app.alertMessage,
});

const mapDispatchToProps = dispatch => ({
  setAuthenticated: status => dispatch(setAuthenticated(status)),
  getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
  logout: () => dispatch(logout()),
  displayAlert: (message, status) => dispatch(displayAlert(message, status)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
