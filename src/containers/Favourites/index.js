/**
 *
 * Favourites
 *
 */

import React from "react";
import { connect } from "react-redux";

import { defaultAction } from "./actions";

import "./Favourites.css";

export class Favourites extends React.Component {
  render() {
    return <div />;
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
)(Favourites);
