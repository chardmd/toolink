/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

import "./SideBar.css";

//components
import CategoryList from "../CategoryList";
import Maintenance from "../Maintenance";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 300,
  },
  drawerPaper: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
});

const INACTIVE = -1;

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputActive: false,
      category: "",
      activeCategoryId: this.props.activeCategoryId || 0,
      activeTrash: INACTIVE,
    };

    this.toggleIsInputActive = this.toggleIsInputActive.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.activeCategoryId !== nextProps.activeCategoryId) {
      this.setState({
        activeCategoryId: nextProps.activeCategoryId,
      });
    }
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
      <div className="SideBar">
        {this.props.categories.length !== 0 && (
          <Drawer
            variant="permanent"
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
          >
            <div className={this.props.classes.toolbar} />
            <div className="catList">
              <div className="categories">
                <CategoryList
                  categories={this.props.categories}
                  addCategory={this.props.addCategory}
                  removeCategory={this.props.removeCategory}
                  renameCategory={this.props.renameCategory}
                  getCategoryLinks={this.props.getCategoryLinks}
                  activeCategoryId={this.state.activeCategoryId}
                />
              </div>
              <div className="addContainer">
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
                  <span>
                    {this.state.isInputActive ? "Save" : "Add Category"}
                  </span>
                </Button>
              </div>
              <div>
                <Maintenance activeTrash={this.state.activeTrash} />
              </div>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

SideBar.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  getCategoryLinks: PropTypes.func,
  getTrash: PropTypes.func,
  activeCategoryId: PropTypes.number,
};

export default withStyles(styles)(SideBar);
