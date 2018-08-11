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
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { withStyles } from "@material-ui/core/styles";

//components
import CategoryMenu from "../CategoryMenu";

import "./CategoryList.css";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputActive: false,
      category: "",
      anchorEl: null
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.toggleIsInputActive = this.toggleIsInputActive.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
  }

  handleChange = event => {
    this.setState({ category: event.target.value });
  };

  toggleIsInputActive = status => {
    this.setState({
      isInputActive: status
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

  renderCategories() {
    const { classes } = this.props;
    const content = this.props.categories.map(data => {
      const category = data;
      return (
        <ListItem button className="listItem" key={`category-${category.id}`}>
          <ListItemAvatar>
            <Avatar>
              <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={category.name} />
          <ListItemSecondaryAction>
            <CategoryMenu
              categoryId={category.id}
              removeCategory={this.props.removeCategory}
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

  renderMaintenance = () => {
    const { classes } = this.props;
    return (
      <List
        component="nav"
        className={classes.root}
        subheader={
          <ListSubheader className="subHeader" component="div">
            Maintenance
          </ListSubheader>
        }
      >
        <ListItem button className="listItem">
          <ListItemAvatar>
            <Avatar>
              <Icon>delete</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    );
  };

  render() {
    return (
      <div className="CategoryList">
        <div className="categories">{this.renderCategories()}</div>
        <div className="addContainer">
          {this.state.isInputActive && (
            <TextField
              id="search"
              InputLabelProps={{
                shrink: true
              }}
              label="New Category"
              type="search"
              className="textField"
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
          <Button color="secondary" onClick={this.onAddCategory}>
            <Icon>add</Icon>
            &nbsp;
            <span>{this.state.isInputActive ? "Save" : "Add Category"}</span>
          </Button>
        </div>
        <div>{this.renderMaintenance()}</div>
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func
};

export default withStyles(styles)(CategoryList);
