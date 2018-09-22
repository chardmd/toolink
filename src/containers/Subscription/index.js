/**
 *
 * Subscription
 *
 */

import React from "react";
import { connect } from "react-redux";

import { defaultAction } from "./actions";

import "./Subscription.css";

export class Subscription extends React.Component {
  render() {
    return <div>Subscription Page</div>;
  }
}

const mapStateToProps = state => ({
  myProperty: state.app.myProperty,
});

const mapDispatchToProps = dispatch => ({
  defaultAction: () => dispatch(defaultAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subscription);
