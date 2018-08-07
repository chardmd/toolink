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
  }

  handleClose = () => {
    this.props.toggleStatus(false);
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
              <img src={blockImage} className="blockImage" />
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
            </div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Link"
              type="text"
              fullWidth
              autoComplete="off"
            />
          </DialogContent>
          <DialogContent>
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              color="primary"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              className={classes.chip}
            />
            <Chip
              avatar={<Avatar>WE</Avatar>}
              label="Web Development"
              className={classes.chip}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
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
  toggleStatus: PropTypes.func
};

export default withStyles(styles)(FormDialog);
