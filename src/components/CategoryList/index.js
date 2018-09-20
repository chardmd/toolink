/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
    return (
      <div className="CategoryList">
        <List
          component="nav"
          className={classes.root}
          subheader={
            <ListSubheader className="subHeader" component="div" disableSticky>
              Categories
            </ListSubheader>
          }
        >
          {this.props.categories.length === 0 ? (
            <div className="emptyList">
              <p>Empty List</p>
            </div>
          ) : (
            this.props.categories.map(data => {
              const { categoryId, categoryName } = data;
              return (
                <ListItem
                  button
                  key={`category-${categoryId}`}
                  component={Link}
                  to={`/categories/${categoryId}`}
                  className={`listItem ${this.props.activeCategoryId ===
                    categoryId && "active"}`}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Avatar>
                        {(categoryName || "  ").substring(0, 2).toUpperCase()}
                      </Avatar>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={categoryName} />
                  <ListItemSecondaryAction>
                    <CategoryMenu
                      categoryId={categoryId}
                      categoryName={categoryName}
                      removeCategory={this.props.removeCategory}
                      renameCategory={this.props.renameCategory}
                      removeLinkCategory={this.props.removeLinkCategory}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          )}
        </List>
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  activeCategoryId: PropTypes.string,
  removeLinkCategory: PropTypes.func,
};

export default withStyles(styles)(CategoryList);
