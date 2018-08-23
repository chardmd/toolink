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

    this.state = {
      link: "",
      activeCategory: 0,
      linkError: "",
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  onAdd = () => {
    const link = this.state.link;
    if (link.length !== 0 && this.state.linkError.length === 0) {
      this.props.saveLink(link);
    }
    this.props.toggleStatus(false);
  };

  selectCategory(index) {
    this.setState({
      activeCategory: index,
    });
  }

  handleClose = () => {
    //clear the link error
    this.props.toggleStatus(false);
  };

  handleOnBlur(value) {
    if (!isUrl(value) && value.length !== 0) {
      this.setState({
        linkError: "Invalid Link format",
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

  renderCategories = () => {
    const { categories } = this.props;
    return (
      categories &&
      categories.map((category, index) => (
        <Chip
          key={`cat-chip-${category.id}`}
          avatar={
            <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
          }
          color={index === this.state.activeCategory ? "primary" : "default"}
          label={category.name}
          className={this.props.classes.chip}
          onClick={() => {
            this.selectCategory(index);
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
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.onAdd();
            }
          }}
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
              onChange={this.handleChange}
              onBlur={() => {
                this.handleOnBlur(this.state.link);
              }}
              error={this.state.linkError.length !== 0 && true}
              helperText={this.state.linkError}
            />
          </DialogContent>
          <DialogContent>{this.renderCategories()}</DialogContent>
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
};

export default withStyles(styles)(FormDialog);
