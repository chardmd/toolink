/**
 *
 * RemoveDialog
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./RemoveDialog.css";

class RemoveDialog extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.isActive}
          onClose={this.props.onClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.props.onSave();
            }
          }}
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onSave} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

RemoveDialog.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default RemoveDialog;
