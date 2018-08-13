/**
 *
 * RenameDialog
 *
 */

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import "./RenameDialog.css";

class RenameDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: props.categoryName
    };

    this.handleSave = this.handleSave.bind(this);
  }

  handleChange = event => {
    this.setState({ categoryName: event.target.value });
  };

  handleFocus = event => {
    event.target.select();
  };

  handleSave() {
    const { categoryId } = this.props;
    const { categoryName } = this.state;
    this.props.renameCategory(categoryId, categoryName);
    this.props.onClose();
  }

  render() {
    return (
      <div>
        <Dialog
          maxWidth="sm"
          open={this.props.isActive}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
          fullWidth
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.handleSave();
            }
          }}
        >
          <DialogTitle id="form-dialog-title">Rename Category</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              InputLabelProps={{
                shrink: true
              }}
              margin="dense"
              id="rename_category"
              label="Category"
              type="search"
              fullWidth
              value={this.state.categoryName}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

RenameDialog.propTypes = {
  isActive: PropTypes.bool,
  categoryId: PropTypes.number,
  categoryName: PropTypes.string,
  toggleStatus: PropTypes.func,
  onClose: PropTypes.func,
  renameCategory: PropTypes.func
};

export default RenameDialog;
