/**
 *
 * SideBar
 *
 */

import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

import "./Sidebar.css";

//components
import CategoryList from "../../components/CategoryList";
import Trash from "../../components/Trash";
import AddCategory from "../../components/AddCategory";
import FavItem from "../../components/FavItem";

//actions
import {
  addCategory,
  removeCategory,
  renameCategory,
} from "../Categories/actions";
import { getCategoryLinks } from "../Links/actions";
import { getTrash } from "../Maintenance/actions";

const styles = theme => ({
  drawerPaper: {
    paddingBottom: "20px",
  },
  toolbar: theme.mixins.toolbar,
});

class Sidebar extends React.Component {
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
      <div className="drawerContent">
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
      </div>
    );
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className="Sidebar">
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

Sidebar.propTypes = {
  activeCategoryId: PropTypes.string,
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  addCategory: category => dispatch(addCategory(category)),
  removeCategory: id => dispatch(removeCategory(id)),
  renameCategory: (id, categoryName) =>
    dispatch(renameCategory(id, categoryName)),
  getTrash: () => dispatch(getTrash()),
  getCategoryLinks: categoryId => dispatch(getCategoryLinks(categoryId)),
});

export default compose(
  withRouter,
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Sidebar);
