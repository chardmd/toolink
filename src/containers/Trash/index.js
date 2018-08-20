/**
 *
 * Trash
 *
 */

import React from "react";
import { connect } from "react-redux";

import {} from "./actions";

import "./Trash.css";

export class Trash extends React.Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({
  trash: state.trash.data,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
