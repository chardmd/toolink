import React, { Component } from "react";
import { Link } from "react-router-dom";
import { TextField, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";

//components
import LoaderButton from "../../components/LoaderButton";

import { validateEmail, validatePassword } from "../../libs/utils.js";
import { forgotPassword, forgotPasswordCode, setLoading } from "./actions";
import "./ForgotPassword.css";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
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
    return this.state.email.length > 0 && this.state.error.email.length === 0;
  }

  validateConfirmationForm() {
    return (
      this.state.confirmationCode.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
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

  handleAlertClose = () => {
    this.props.setAlertOpen(false);
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.forgotPassword(this.state.email);
    }
  };

  handleConfirmationSubmit = event => {
    event.preventDefault();
    if (this.validateConfirmationForm()) {
      this.props.forgotPasswordCode(
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
            <div>
              <TextField
                id="password"
                label="New Password"
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
            Forgotten your password?
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
            <div className="loaderButton">
              <LoaderButton
                size="large"
                fullWidth
                type="submit"
                isLoading={this.props.isLoading}
                text="Continue"
                loadingText="Sending code .."
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
      <div className="ForgotPassword">
        {this.props.isSuccess
          ? this.renderConfirmationForm()
          : this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.forgotPassword.isLoading,
  isSuccess: state.forgotPassword.isSuccess,
  error: state.forgotPassword.error,
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: data => dispatch(forgotPassword(data)),
  forgotPasswordCode: (email, confirmationCode, password) =>
    dispatch(forgotPasswordCode(email, confirmationCode, password)),
  setLoading: isLoading => dispatch(setLoading(isLoading)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
