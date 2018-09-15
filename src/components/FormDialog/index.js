import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import isUrl from "is-url";

import collectionImage from "../../assets/collection.svg";

import "./FormDialog.css";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    const activeCategoryId = this.props.activeCategoryId
      ? this.props.activeCategoryId
      : props.categories.length && props.categories[0].categoryId;

    this.state = {
      link: "",
      activeCategoryId: activeCategoryId,
      linkError: "",
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeCategoryId !== nextProps.activeCategoryId) {
      this.setState({
        activeCategoryId: nextProps.activeCategoryId,
      });
    }
  }

  onAdd = () => {
    const link = this.state.link;
    if (link.length !== 0 && this.state.linkError.length === 0) {
      this.props.saveLink(link, this.state.activeCategoryId);
    }
    this.props.toggleStatus(false);
  };

  selectCategory(categoryId) {
    this.setState({
      activeCategoryId: categoryId,
    });
  }

  handleClose = () => {
    //clear the link error
    this.props.toggleStatus(false);
  };

  handleOnBlur(value) {
    if (!isUrl(value) && value.length !== 0) {
      this.setState({
        linkError: "Invalid URL",
      });
    } else {
      this.setState({
        linkError: "",
      });
    }
  }

  handleChange = event => {
    this.setState({ link: event.target.value });
  };

  handleFocus(event) {
    event.target.select();
  }

  renderCategories = () => {
    const { categories } = this.props;
    const activeId = this.state.activeCategoryId
      ? this.state.activeCategoryId
      : categories.length && categories[0].categoryId;
    return (
      categories &&
      categories.map(category => (
        <Chip
          key={`cat-chip-${category.categoryId}`}
          avatar={
            <Avatar>
              {category.categoryName.substring(0, 2).toUpperCase()}
            </Avatar>
          }
          color={category.categoryId === activeId ? "primary" : "default"}
          label={category.categoryName}
          className={this.props.classes.chip}
          onClick={() => {
            this.selectCategory(category.categoryId);
          }}
        />
      ))
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          maxWidth="md"
          open={this.props.isActive}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Paste Link</DialogTitle>
          <DialogContent>
            <div className="dialogDisplay">
              <img
                src={collectionImage}
                className="collectionImage"
                alt="collection"
              />
              <DialogContentText>
                Just paste the link and you are ready to go!
              </DialogContentText>
            </div>
            <TextField
              autoFocus
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              id="name"
              label="Link"
              type="text"
              fullWidth
              autoComplete="off"
              value={this.state.link}
              onChange={this.handleChange}
              onBlur={() => {
                this.handleOnBlur(this.state.link);
              }}
              error={this.state.linkError.length !== 0 && true}
              helperText={this.state.linkError}
              onFocus={this.handleFocus}
            />
          </DialogContent>
          <DialogContent>
            <h4>Choose a category</h4>
            <div>{this.renderCategories()}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} size="medium" color="primary">
              Cancel
            </Button>
            <Button onClick={this.onAdd} size="medium" color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
FormDialog.propTypes = {
  isActive: PropTypes.bool,
  toggleStatus: PropTypes.func,
  categories: PropTypes.array,
  saveLink: PropTypes.func,
  activeCategoryId: PropTypes.string,
};

export default withStyles(styles)(FormDialog);
