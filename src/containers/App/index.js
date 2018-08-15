import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import NavBar from "../../components/NavBar";

import Routes from "../../Routes";
import { getAuthenticatedUser } from "../Login/actions";
import { logout, setAuthenticated, displayAlert } from "./actions";

//components
import SimpleSnackbar from "../../components/SimpleSnackbar";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
    };
  }

  componentDidMount() {
    this.props.getAuthenticatedUser();
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      userHasAuthenticated: this.props.setAuthenticated,
    };

    return (
      !this.props.isAuthenticating && (
        <div className="App">
          <div className="root">
            <NavBar
              isAuthenticated={this.props.isAuthenticated}
              handleLogout={this.props.logout}
              handleDrawerToggle={this.handleDrawerToggle}
            />
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
