/**
 *
 * AddCategory
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import "./AddCategory.css";

class AddCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputActive: false,
      category: "",
    };

    this.toggleIsInputActive = this.toggleIsInputActive.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  toggleIsInputActive = status => {
    this.setState({
      isInputActive: status,
    });
  };

  onAddCategory() {
    if (this.state.isInputActive) {
      const category = this.state.category;
      if (category.length !== 0) {
        this.props.addCategory(category);
        this.toggleIsInputActive(false);
      }
    } else {
      this.toggleIsInputActive(true);
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.isInputActive && (
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Category Name"
            type="search"
            className="addCategoryField"
            margin="normal"
            fullWidth
            autoFocus
            onChange={this.handleChange}
            onBlur={e => {
              if (e.target.value.length === 0) {
                this.toggleIsInputActive(false);
              }
            }}
          />
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.onAddCategory}
          size="large"
          disabled={this.state.activeCategory === -1}
        >
          <Icon>add</Icon>
          &nbsp;
          <span>{this.state.isInputActive ? "Save" : "Add Category"}</span>
        </Button>
      </Fragment>
    );
  }
}

AddCategory.propTypes = {
  addCategory: PropTypes.func,
};

export default AddCategory;
