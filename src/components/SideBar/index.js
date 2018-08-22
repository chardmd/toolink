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
import Trash from "../Trash";
import AddCategory from "../AddCategory";
import FavItem from "../FavItem";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
});

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isQuickAccessActive: true,
      isCategoriesActive: false,
      isTrashActive: false,
    };

    this.updateActiveItem = this.updateActiveItem.bind(this);
  }

  updateActiveItem(isQuickAccessActive, isCategoriesActive, isTrashActive) {
    this.setState({
      isQuickAccessActive,
      isCategoriesActive,
      isTrashActive,
    });
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
            <div className="favourites">
              <FavItem
                updateActiveItem={this.updateActiveItem}
                isActive={this.state.isQuickAccessActive}
              />
            </div>
            <div className="catList">
              <div className="categories">
                <CategoryList
                  categories={this.props.categories}
                  addCategory={this.props.addCategory}
                  removeCategory={this.props.removeCategory}
                  renameCategory={this.props.renameCategory}
                  getCategoryLinks={this.props.getCategoryLinks}
                  activeCategoryId={this.props.activeCategoryId}
                  updateActiveItem={this.updateActiveItem}
                  isActive={this.state.isCategoriesActive}
                />
              </div>
              <div className="addContainer">
                <AddCategory addCategory={this.props.addCategory} />
              </div>
              <div>
                <Trash
                  updateActiveItem={this.updateActiveItem}
                  isActive={this.state.isTrashActive}
                />
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
