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
import blockImage from "../../assets/blocks.svg";

import "./FormDialog.css";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      link: ""
    };

    this.renderCategories = this.renderCategories.bind(this);
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd = () => {
    const link = this.state.link;
    this.props.saveLink(link);
    this.props.toggleStatus(false);
  };

  handleClose = () => {
    this.props.toggleStatus(false);
  };

  handleChange = event => {
    this.setState({ link: event.target.value });
  };

  renderCategories = () => {
    const { categories } = this.props;
    return (
      categories &&
      categories.map(category => (
        <Chip
          key={`cat-chip-${category.id}`}
          avatar={
            <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
          }
          label={category.name}
          className={this.props.classes.chip}
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
              <img src={blockImage} className="blockImage" alt="block" />
              <DialogContentText>
                Just paste the link and you are ready to go!
              </DialogContentText>
            </div>
            <TextField
              autoFocus
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              id="name"
              label="Link"
              type="text"
              fullWidth
              autoComplete="off"
              onChange={this.handleChange}
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
  saveLink: PropTypes.func
};

export default withStyles(styles)(FormDialog);
