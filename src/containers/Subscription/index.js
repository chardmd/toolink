/**
 *
 * Subscription
 *
 */

import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Elements, StripeProvider } from "react-stripe-elements";

import { defaultAction } from "./actions";

import BillingForm from "../../components/BillingForm";
import config from "../../config";
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
      await this.billUser({
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
            component="h3"
            align="center"
            color="secondary"
            className="headline"
          >
            Get more features, Upgrade to Premium
          </Typography>
          <StripeProvider apiKey={config.STRIPE_KEY}>
            <Elements>
              <BillingForm
                loading={this.state.isLoading}
                onSubmit={this.handleFormSubmit}
              />
            </Elements>
          </StripeProvider>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myProperty: state.app.myProperty,
});

const mapDispatchToProps = dispatch => ({
  defaultAction: () => dispatch(defaultAction()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Subscription);
