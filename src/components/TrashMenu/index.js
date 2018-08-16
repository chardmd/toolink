/**
 *
 * TrashMenu
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//components
import RemoveDialog from "../RemoveDialog";

import "./TrashMenu.css";

class TrashMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      removeDialogOpen: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.toggleRemoveDialog = this.toggleRemoveDialog.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  toggleRemoveDialog(status) {
    this.setState({
      removeDialogOpen: status,
    });
  }

  handleRemoveCategory() {
    this.toggleRemoveDialog(false);
  }

  render() {
    const { anchorEl } = this.state;
    return (
      <Fragment>
        <RemoveDialog
          title={`Empty Trash?`}
          message={`Are you sure you want to permanently erase the items in the Trash? You can’t undo this action.`}
          isActive={this.state.removeDialogOpen}
          onSave={this.handleRemoveCategory}
          onClose={() => {
            this.toggleRemoveDialog(false);
          }}
        />
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            key={`menu-remove`}
            onClick={() => {
              this.toggleRemoveDialog(true);
              this.handleClose();
            }}
          >
            Empty Trash
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

TrashMenu.propTypes = {
  emptyTrash: PropTypes.func,
};

export default TrashMenu;
