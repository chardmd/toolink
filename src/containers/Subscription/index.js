/**
 *
 * Subscription
 *
 */

import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
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

  handleFormSubmit = async (storage, { token, error }) => {
    if (error) {
      alert(error);
      return;
    }

    this.setState({ isLoading: true });

    try {
      this.props.billUser({
        storage,
        source: token.id,
      });

      alert("Your card has been charged successfully!");
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
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
  myProperty: state.app.myProperty,
});

const mapDispatchToProps = dispatch => ({
  billUser: details => dispatch(billUser(details)),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Subscription);
