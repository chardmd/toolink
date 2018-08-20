/**
 *
 * CategoryList
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/core/styles";

//components
import CategoryMenu from "../CategoryMenu";

import "./CategoryList.css";

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

class CategoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputActive: false,
      category: "",
      anchorEl: null,
      activeCategoryId: this.props.activeCategoryId || 0,
      activeTrash: INACTIVE,
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.toggleIsInputActive = this.toggleIsInputActive.bind(this);
    this.onAddCategory = this.onAddCategory.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectTrash = this.selectTrash.bind(this);
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

  selectCategory(categoryId) {
    this.setState({
      activeCategoryId: categoryId,
      activeTrash: INACTIVE,
    });
  }

  selectTrash(index) {
    this.setState({
      activeTrash: index,
      activeCategoryId: INACTIVE,
    });
  }

  renderCategories() {
    const { classes } = this.props;
    const { activeCategoryId } = this.state;

    const content =
      this.props.categories.length !== 0 &&
      this.props.categories.map(data => {
        const category = data;
        return (
          <ListItem
            button
            className={`listItem ${category.id === activeCategoryId &&
              "active"}`}
            key={`category-${category.id}`}
            onClick={() => {
              this.selectCategory(category.id);
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

  renderMaintenance = () => {
    const { classes } = this.props;
    const { activeTrash } = this.state;
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
        <ListItem
          button
          component={Link}
          to="/maintenance/trash"
          className={`listItem ${0 === activeTrash && "active"}`}
          onClick={() => {
            this.selectTrash(0);
          }}
        >
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
        {this.props.categories.length !== 0 && (
          <Drawer
            variant="permanent"
            classes={{
              paper: this.props.classes.drawerPaper,
            }}
          >
            <div className={this.props.classes.toolbar} />
            <div className="catList">
              <div className="categories">{this.renderCategories()}</div>
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
              <div>{this.renderMaintenance()}</div>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array,
  addCategory: PropTypes.func,
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  getCategoryLinks: PropTypes.func,
  getTrash: PropTypes.func,
  activeCategoryId: PropTypes.number,
};

export default withStyles(styles)(CategoryList);
