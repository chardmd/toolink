/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { withStyles } from "@material-ui/core/styles";

//components
import CategoryMenu from "../CategoryMenu";

import "./CategoryList.css";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 300,
  },
});

class CategoryList extends React.Component {
  render() {
    const { classes } = this.props;

    const content =
      this.props.categories.length !== 0 &&
      this.props.categories.map(data => {
        const category = data;
        return (
          <ListItem
            button
            className={`listItem ${category.id ===
              this.props.activeCategoryId &&
              this.props.isActive &&
              "active"}`}
            key={`category-${category.id}`}
            onClick={() => {
              this.props.updateActiveItem(false, true, false);
              this.props.getCategoryLinks(category.id);
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <CategoryMenu
                categoryId={category.id}
                categoryName={category.name}
                removeCategory={this.props.removeCategory}
                renameCategory={this.props.renameCategory}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    return (
      <List
        component="nav"
        className={classes.root}
        subheader={
          <ListSubheader className="subHeader" component="div" disableSticky>
            Categories
          </ListSubheader>
        }
      >
        {content}
      </List>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  activeCategoryId: PropTypes.number,
  updateActiveItem: PropTypes.func,
  isActive: PropTypes.bool,
};

export default withStyles(styles)(CategoryList);
