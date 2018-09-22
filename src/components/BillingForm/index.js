/**
 *
 * BillingForm
 *
 */

import React from "react";
import PropTypes from "prop-types";
import FormGroup from "@material-ui/core/FormGroup";
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
      storage: "",
      isProcessing: false,
      isCardComplete: false,
    };
  }

  validateForm() {
    return (
      this.state.name !== "" &&
      this.state.storage !== "" &&
      this.state.isCardComplete
    );
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
  };

  render() {
    const loading = this.state.isProcessing || this.props.loading;
    return (
      <form className="BillingForm" onSubmit={this.handleSubmitClick}>
        <div>
          <FormControl>
            <InputLabel htmlFor="storage">Storage</InputLabel>
            <Input
              fullWidth
              id="storage"
              value={this.state.storage}
              onChange={this.handleFieldChange}
              placeholder="Number of notes to store"
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="cardholder">Cardholder&apos;s name</InputLabel>
            <Input
              fullWidth
              id="cardholder"
              value={this.state.name}
              onChange={this.handleFieldChange}
              placeholder="Name on the card"
            />
          </FormControl>
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="cardholder">Credit Card Info</InputLabel>
            <CardElement
              id="cardholder"
              className="card-field"
              onChange={this.handleCardFieldChange}
            />
          </FormControl>
        </div>
        <div>
          <LoaderButton
            type="submit"
            text="Purchase"
            isLoading={loading}
            loadingText="Purchasing…"
            disabled={!this.validateForm()}
          />
        </div>
      </form>
    );
  }
}

BillingForm.propTypes = {
  active: PropTypes.bool,
};

export default injectStripe(BillingForm);
