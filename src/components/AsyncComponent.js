import React, { Component } from "react";
import { SyncLoader } from "react-spinners";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component,
      });
    }

    render() {
      const C = this.state.component;

      return C ? (
        <C {...this.props} />
      ) : (
        <div className="loader">
          <SyncLoader color={"#2196f3"} loading size={25} margin="5px" />
        </div>
      );
    }
  }

  return AsyncComponent;
}
