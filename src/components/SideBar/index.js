/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";

import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

import "./SideBar.css";

//components
import CategoryList from "../CategoryList";
import Maintenance from "../Maintenance";
import AddCategory from "../AddCategory";

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
      activeCategoryId: this.props.activeCategoryId || 0,
      activeTrash: INACTIVE,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.activeCategoryId !== nextProps.activeCategoryId) {
      this.setState({
        activeCategoryId: nextProps.activeCategoryId,
      });
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
                <AddCategory addCategory={this.props.addCategory} />
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
