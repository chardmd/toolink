/**
 *
 * CategoryList
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
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
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
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
    this.renderDrawerContent = this.renderDrawerContent.bind(this);
  }

  updateActiveItem(isQuickAccessActive, isCategoriesActive, isTrashActive) {
    this.setState({
      isQuickAccessActive,
      isCategoriesActive,
      isTrashActive,
    });
  }

  renderDrawerContent() {
    return (
      <Fragment>
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
      </Fragment>
    );
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className="SideBar">
        {this.props.categories.length !== 0 && (
          <Fragment>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={this.props.mobileOpen}
                onClose={this.props.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {this.renderDrawerContent()}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: this.props.classes.drawerPaper,
                }}
              >
                {this.renderDrawerContent()}
              </Drawer>
            </Hidden>
          </Fragment>
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
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(SideBar);
