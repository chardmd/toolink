import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { TextField, Paper, Typography, Hidden, Grid } from "@material-ui/core";

//components
import LoaderButton from "../../components/LoaderButton";

import googleIcon from "../../assets/google.svg";
import facebookIcon from "../../assets/facebook.svg";
import welcomeImage from "../../assets/welcome.svg";
import config from "../../config";

import { validateEmail, validatePassword } from "../../libs/utils.js";
import { signIn, googleSignIn, facebookSignIn } from "./actions";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  validateEmailField = email => {
    const isValid = validateEmail(email);
    if (!isValid) {
      this.setState({
        emailError: "Invalid Email Address",
      });
    } else {
      this.setState({
        emailError: "",
      });
    }
  };

  handleValidatePassword = password => {
    if (!validatePassword(password)) {
      this.setState({
        passwordError: "Invalid password",
      });
    } else {
      this.setState({
        passwordError: "",
      });
    }
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.passwordError.length === 0 &&
      this.state.emailError.length === 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleGoogleSignIn = response => {
    this.props.googleSignIn(response);
  };

  handleFacebookSignIn = response => {
    this.props.facebookSignIn(response);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signIn({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };

  handleAlertClose = () => {
    this.props.setAlertOpen(false);
  };

  render() {
    return (
      <div className="Login">
        <Grid container alignItems="center" justify="center" spacing={32}>
          <Hidden only={["xs", "sm"]}>
            <Grid item md={6}>
              <div className="imageContainer">
                <img
                  src={welcomeImage}
                  width="400px"
                  height="400px"
                  alt="welcome"
                />
              </div>
            </Grid>
          </Hidden>
          <Grid item sm={6} md={6}>
            <Paper elevation={3} className="paper">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <Typography variant="headline" component="h3" align="center">
                    Great to see you again!
                  </Typography>
                </div>
                <div>
                  <TextField
                    id="email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    onBlur={this.validateEmailField.bind(
                      this,
                      this.state.email
                    )}
                    error={this.state.emailError.length !== 0 && true}
                    helperText={this.state.emailError}
                  />
                </div>
                <div>
                  <TextField
                    id="password"
                    label="Password"
                    onBlur={this.handleValidatePassword.bind(
                      this,
                      this.state.password
                    )}
                    value={this.state.password}
                    type="password"
                    onChange={this.handleChange}
                    margin="normal"
                    fullWidth
                    error={this.state.passwordError.length !== 0 && true}
                    helperText={this.state.passwordError}
                  />
                </div>
                <div className="socialLogin">
                  <p>Or use &nbsp;</p>
                  <GoogleLogin
                    clientId={config.GOOGLE_CLIENT_ID}
                    buttonText="Login using Google"
                    onSuccess={this.handleGoogleSignIn}
                    render={renderProps => (
                      <img
                        className="googleLogin"
                        src={googleIcon}
                        alt="google login"
                        onClick={renderProps.onClick}
                      />
                    )}
                  />
                  <FacebookLogin
                    appId={config.FACEBOOK_APP_ID}
                    callback={this.handleFacebookSignIn}
                    render={renderProps => (
                      <img
                        className="facebookLogin"
                        src={facebookIcon}
                        alt="facebook login"
                        onClick={renderProps.onClick}
                      />
                    )}
                  />
                </div>
                <div className="buttonContainer">
                  <div>
                    <Link to="/forgot" className="secondary">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="loginButton">
                    <LoaderButton
                      variant="extendedFab"
                      color="secondary"
                      size="large"
                      fullWidth
                      type="submit"
                      isLoading={this.props.isLoading}
                      text="Login"
                      loadingText="Logging in…"
                    />
                  </div>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <div className="signUpText">
              <p>
                Don't have an account?&nbsp;&nbsp;
                <Link to="/signup" className="secondary">
                  Get Started
                </Link>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = dispatch => ({
  signIn: data => dispatch(signIn(data)),
  googleSignIn: data => dispatch(googleSignIn(data)),
  facebookSignIn: data => dispatch(facebookSignIn(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
