import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import NavBar from "../../components/NavBar";
import CategoryList from "../../components/CategoryList";
import Routes from "../../Routes";
import { getAuthenticatedUser } from "../Login/actions";
import {
  logout,
  setAuthenticated,
  displayAlert,
  addCategory,
  removeCategory,
  renameCategory,
  getTrash,
  getCategories,
  getCategoryLinks,
} from "./actions";

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
    this.props.getCategories();
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
            {this.props.isAuthenticated && (
              <CategoryList
                categories={this.props.categories}
                addCategory={this.props.addCategory}
                removeCategory={this.props.removeCategory}
                renameCategory={this.props.renameCategory}
                getCategoryLinks={this.props.getCategoryLinks}
                getTrash={this.props.getTrash}
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
  categories: state.app.categories,
});

const mapDispatchToProps = dispatch => ({
  setAuthenticated: status => dispatch(setAuthenticated(status)),
  getAuthenticatedUser: () => dispatch(getAuthenticatedUser()),
  logout: () => dispatch(logout()),
  displayAlert: (message, status) => dispatch(displayAlert(message, status)),
  addCategory: category => dispatch(addCategory(category)),
  removeCategory: id => dispatch(removeCategory(id)),
  renameCategory: (id, text) => dispatch(renameCategory(id, text)),
  getTrash: () => dispatch(getTrash()),
  getCategories: () => dispatch(getCategories()),
  getCategoryLinks: categoryId => dispatch(getCategoryLinks(categoryId)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(App);
