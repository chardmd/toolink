/**
 *
 * AlertDialog
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

import "./AlertDialog.css";

class AlertDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const { categoryId } = this.props;
    this.props.removeCategory(categoryId);
    this.props.onClose();
  }

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
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete this category?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will delete all related tools and links under this category.
              Press the DELETE button to continue.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AlertDialog.propTypes = {
  categoryId: PropTypes.number,
  isActive: PropTypes.bool,
  removeCategory: PropTypes.func,
  onClose: PropTypes.func
};

export default AlertDialog;
