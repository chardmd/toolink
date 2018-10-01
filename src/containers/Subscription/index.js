/**
 *
 * Subscription
 *
 */

import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import { Elements, StripeProvider } from "react-stripe-elements";

import { billUser } from "./actions";

import BillingForm from "../../components/BillingForm";
import config from "../../config";
import cupcakeImage from "../../assets/cupcake.svg";
import "./Subscription.css";

export class Subscription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  handleFormSubmit = (token, error) => {
    const email = this.props.email;
    this.props.billUser(token.id, email, error);
  };

  render() {
    return (
      <div className="Subscription">
        <Paper className="paper" elevation={1}>
          <Typography
            variant="display1"
            component="h1"
            align="center"
            color="secondary"
            className="headline"
          >
            Get More Features, Upgrade to Premium
          </Typography>
          <br />
          <div className="container">
            <div className="left">
              <div>
                <h1 className="pricing">$3.50/mo</h1>
                <img src={cupcakeImage} alt="cupcake" />
                <Chip label="Just like buying a cupcake, but better 😁" />
              </div>
            </div>
            <div className="right">
              <StripeProvider apiKey={config.STRIPE_KEY}>
                <Elements>
                  <BillingForm
                    loading={this.state.isLoading}
                    onSubmit={this.handleFormSubmit}
                  />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  email: state.login.data.attributes.email,
});

const mapDispatchToProps = dispatch => ({
  billUser: (source, email, error) => dispatch(billUser(source, email, error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscription);
