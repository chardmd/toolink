/**
 *
 * CategoryMenu
 *
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//components
import RenameDialog from "../RenameDialog";
import AlertDialog from "../AlertDialog";

import "./CategoryMenu.css";

class CategoryMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      renameDialogOpen: false,
      alertDialogOpen: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.toggleRenameDialog = this.toggleRenameDialog.bind(this);
    this.toggleAlertDialog = this.toggleAlertDialog.bind(this);
    this.onRemoveCategory = this.onRemoveCategory.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  toggleRenameDialog(status) {
    this.setState({
      renameDialogOpen: status
    });
  }

  toggleAlertDialog(status) {
    this.setState({
      alertDialogOpen: status
    });
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onRemoveCategory(id) {
    this.props.removeCategory(id);
    this.handleClose();
  }

  render() {
    const { anchorEl } = this.state;
    const { categoryId, categoryName } = this.props;
    return (
      <Fragment>
        <RenameDialog
          categoryId={categoryId}
          categoryName={categoryName}
          isActive={this.state.renameDialogOpen}
          onClose={() => {
            this.toggleRenameDialog(false);
          }}
          renameCategory={this.props.renameCategory}
        />
        <AlertDialog
          categoryId={categoryId}
          isActive={this.state.alertDialogOpen}
          removeCategory={this.props.removeCategory}
          onClose={() => {
            this.toggleAlertDialog(false);
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
          PaperProps={{
            style: {
              width: 100
            }
          }}
        >
          <MenuItem
            key={`menu-item-1`}
            onClick={() => {
              this.toggleRenameDialog(true);
              this.handleClose();
            }}
          >
            Rename
          </MenuItem>
          <MenuItem
            key={`menu-item-2`}
            onClick={() => {
              this.toggleAlertDialog(true);
              this.handleClose();
            }}
          >
            Remove
          </MenuItem>
        </Menu>
      </Fragment>
    );
  }
}

CategoryMenu.propTypes = {
  removeCategory: PropTypes.func,
  renameCategory: PropTypes.func,
  categoryId: PropTypes.number,
  categoryName: PropTypes.string
};

export default CategoryMenu;
