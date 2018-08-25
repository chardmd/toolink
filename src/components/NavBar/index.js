import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import "./NavBar.css";

const styles = theme => ({
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

class NavBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="NavBar">
        <AppBar className={this.props.isAuthenticated ? "appBar" : ""}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className="flex">
              <Link to="/">TooLink</Link>
            </Typography>
            {this.props.isAuthenticated ? (
              <Fragment>
                <Link to="/settings">
                  <Button color="inherit">Upgrade</Button>
                </Link>
                <Button color="inherit" onClick={this.props.handleLogout}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/signup">
                  <Button color="inherit">Sign Up</Button>
                </Link>
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(NavBar);
