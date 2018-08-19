/**
 *
 * SimpleDrawer
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CategoryList from "../CategoryList";

import "./SimpleDrawer.css";

const styles = theme => ({
  drawerPaper: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
});

class SimpleDrawer extends React.Component {
  render() {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper,
        }}
      >
        <div className={this.props.classes.toolbar} />
        <CategoryList
          categories={this.props.categories}
          addCategory={this.props.addCategory}
          removeCategory={this.props.removeCategory}
          renameCategory={this.props.renameCategory}
          getLinkData={this.props.getLinkData}
          getTrash={this.props.getTrash}
        />
      </Drawer>
    );
  }
}

SimpleDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  getLinkData: PropTypes.func,
  getTrash: PropTypes.func,
};

export default withStyles(styles)(SimpleDrawer);
