/**
 *
 * Signup
 *
 */

import React from "react";
import { connect } from "react-redux";

import { TextField, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

//components
import LoaderButton from "../../components/LoaderButton";

import { validateEmail, validatePassword } from "../../libs/utils.js";
import { signUp, confirmSignUp, setLoading } from "./actions";

import "./Signup.css";

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      error: {
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
      },
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword &&
      this.state.error.email.length === 0 &&
      this.state.error.password.length === 0 &&
      this.state.error.confirmPassword.length === 0
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  validateField = (property, value, message) => {
    const isValid = value.length === 0 ? false : true;
    if (!isValid) {
      this.setState({
        error: {
          ...this.state.error,
          [property]: message,
        },
      });
    } else {
      this.setState({
        error: {
          ...this.state.error,
          [property]: "",
        },
      });
    }
  };

  validateEmailField = email => {
    const isValid = validateEmail(email);
    if (!isValid) {
      this.setState({
        error: {
          ...this.state.error,
          email: "Invalid email address",
        },
      });
    } else {
      this.setState({
        error: {
          ...this.state.error,
          email: "",
        },
      });
    }
  };

  handleValidatePassword = (property, password) => {
    if (!validatePassword(password)) {
      this.setState({
        error: {
          ...this.state.error,
          [property]: "Invalid password",
        },
      });
    } else {
      this.setState({
        error: {
          ...this.state.error,
          [property]: "",
        },
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleAlertClose = () => {
    this.props.setAlertOpen(false);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signUp(this.state.email, this.state.password);
    }
  };

  handleConfirmationSubmit = event => {
    event.preventDefault();
    if (this.validateConfirmationForm()) {
      this.props.confirmSignUp(
        this.state.email,
        this.state.confirmationCode,
        this.state.password
      );
    }
  };

  renderConfirmationForm() {
    return (
      <div>
        <Paper elevation={3} className="paper">
          <Typography variant="headline" component="h3" align="center">
            Enter Confirmation Code
          </Typography>
          <form onSubmit={this.handleConfirmationSubmit}>
            <div>
              <TextField
                id="confirmationCode"
                label="Confirmation Code"
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                onBlur={this.validateField.bind(
                  this,
                  "confirmationCode",
                  this.state.confirmationCode,
                  "Confirmation Code is required"
                )}
                error={this.state.error.confirmationCode.length !== 0 && true}
                helperText={this.state.error.confirmationCode}
              />
            </div>
            <div className="loaderButton">
              <LoaderButton
                variant="extendedFab"
                color="secondary"
                size="large"
                fullWidth
                type="submit"
                isLoading={this.props.isLoading}
                text="Verify"
                loadingText="Verifying…"
              />
            </div>
          </form>
        </Paper>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <Paper elevation={3} className="paper">
          <Typography variant="headline" component="h3" align="center">
            Start using TooLink!
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                onBlur={this.validateEmailField.bind(this, this.state.email)}
                error={this.state.error.email.length !== 0 && true}
                helperText={this.state.error.email}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="Password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                onBlur={this.handleValidatePassword.bind(
                  this,
                  "password",
                  this.state.password
                )}
                error={this.state.error.password.length !== 0 && true}
                helperText={this.state.error.password}
              />
            </div>
            <div>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                onBlur={this.handleValidatePassword.bind(
                  this,
                  "confirmPassword",
                  this.state.confirmPassword
                )}
                error={this.state.error.confirmPassword.length !== 0 && true}
                helperText={this.state.error.confirmPassword}
              />
            </div>
            <div className="loaderButton">
              <LoaderButton
                variant="extendedFab"
                color="secondary"
                size="large"
                fullWidth
                type="submit"
                isLoading={this.props.isLoading}
                text="Sign Up FREE"
                loadingText="Signing up…"
              />
            </div>
            <div className="back">
              <Link to="/login" className="secondary">
                Back
              </Link>
            </div>
          </form>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <div className="SignUp">
        {this.props.isSuccess
          ? this.renderConfirmationForm()
          : this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.signUp.isLoading,
  isSuccess: state.signUp.isSuccess,
  alertOpen: state.signUp.alertOpen,
  error: state.signUp.error,
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => dispatch(signUp(email, password)),
  confirmSignUp: (email, confirmationCode, password) =>
    dispatch(confirmSignUp(email, confirmationCode, password)),
  setLoading: isLoading => dispatch(setLoading(isLoading)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
