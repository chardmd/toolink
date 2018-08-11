/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import "./CategoryList.css";

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputActive: false
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.toggleIsInputActive = this.toggleIsInputActive.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
  }

  toggleIsInputActive = status => {
    this.setState({
      isInputActive: status
    });
  };

  onAddCategory() {
    if (this.state.isInputActive) {
      this.props.addCategory("Hello");
      this.toggleIsInputActive(false);
    } else {
      this.toggleIsInputActive(true);
    }
  }

  renderCategories = () => {
    const content = this.props.categories.map(category => (
      <ListItem button className="listItem" key={`category-${category.id}`}>
        <ListItemAvatar>
          <Avatar>
            <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={category.name} />
      </ListItem>
    ));
    return (
      <List component="nav" className="list">
        {content}
      </List>
    );
  };

  render() {
    return (
      <div className="CategoryList">
        <Typography variant="title" align="center">
          Categories
        </Typography>
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
            />
          )}
          <Button color="secondary" size="large" onClick={this.onAddCategory}>
            <Icon>add</Icon>
            &nbsp;
            <span>{this.state.isInputActive ? "Save" : "Add Category"}</span>
          </Button>
        </div>
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  onAddCategory: PropTypes.func
};

export default CategoryList;
