/**
 *
 * BillingForm
 *
 */

import React from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { CardElement, injectStripe } from "react-stripe-elements";
import LoaderButton from "../LoaderButton";

import "./BillingForm.css";

class BillingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      isProcessing: false,
      isCardComplete: false,
    };
  }

  validateForm() {
    return this.state.name !== "" && this.state.isCardComplete;
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete,
    });
  };

  handleSubmitClick = async event => {
    event.preventDefault();

    const { name } = this.state;

    this.setState({ isProcessing: true });

    const { token, error } = await this.props.stripe.createToken({ name });

    this.setState({ isProcessing: false });

    this.props.onSubmit(token, error);
  };

  render() {
    const loading = this.state.isProcessing || this.props.loading;
    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <div className="row">
          <FormControl className="input">
            <InputLabel htmlFor="cardholder">Cardholder&apos;s name</InputLabel>
            <Input
              fullWidth
              id="name"
              value={this.state.name}
              onChange={this.handleFieldChange}
              placeholder="Name on the card"
              autoFocus
            />
          </FormControl>
        </div>
        <div className="cardRow">
          <FormControl className="input">
            <CardElement
              id="cardholder"
              className="card-field"
              onChange={this.handleCardFieldChange}
            />
          </FormControl>
        </div>
        <div className="row">
          <LoaderButton
            variant="extendedFab"
            color="primary"
            size="large"
            type="submit"
            text="Upgrade Now"
            isLoading={loading}
            loadingText="Purchasing…"
          />
        </div>
      </form>
    );
  }
}

BillingForm.propTypes = {
  active: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default injectStripe(BillingForm);
