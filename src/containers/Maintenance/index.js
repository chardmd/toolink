/**
 *
 * Trash
 *
 */

import React, { Fragment } from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import { SyncLoader } from "react-spinners";

import { getTrash, deleteTrash, deleteAll } from "./actions";

//components
import MediaCard from "../../components/MediaCard";
import RemoveDialog from "../../components/RemoveDialog";

//css
import emptyImage from "../../assets/empty.svg";
import "./Maintenance.css";

export class Maintenance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removeDialogOpen: false,
      emptyTrashDialogOpen: false,
      selectedLinkId: null,
    };

    this.handleRemoveDialog = this.handleRemoveDialog.bind(this);
    this.toggleRemoveDialog = this.toggleRemoveDialog.bind(this);
    this.toggleEmptyTrashDialog = this.toggleEmptyTrashDialog.bind(this);
    this.handleEmptyTrashDialog = this.handleEmptyTrashDialog.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  componentDidMount() {
    this.props.getTrash();
  }

  toggleRemoveDialog(status, selectedLinkId) {
    this.setState({
      removeDialogOpen: status,
      selectedLinkId: selectedLinkId,
    });
  }

  handleRemoveDialog() {
    const { selectedLinkId } = this.state;
    this.props.deleteTrash(selectedLinkId);
    this.toggleRemoveDialog(false);
  }

  toggleEmptyTrashDialog(status) {
    this.setState({
      emptyTrashDialogOpen: status,
    });
  }

  handleEmptyTrashDialog() {
    this.props.deleteAll();
    this.toggleEmptyTrashDialog(false);
  }

  renderToolbar() {
    return (
      <Fragment>
        <RemoveDialog
          title={`Permanently delete this link?`}
          message={`You will permanently erase this link in the trash. You can't undo this action. Press 'delete' to continue.`}
          isActive={this.state.removeDialogOpen}
          onSave={this.handleRemoveDialog}
          onClose={() => {
            this.toggleRemoveDialog(false);
          }}
        />
        <Toolbar className="toolbox">
          <div>
            <RemoveDialog
              title={`Delete all the links in the trash?`}
              message={`You will permanently erase links in the trash. You can't undo this action. Press 'delete' to continue.`}
              isActive={this.state.emptyTrashDialogOpen}
              onSave={this.handleEmptyTrashDialog}
              onClose={() => {
                this.toggleEmptyTrashDialog(false);
              }}
            />
            <Button
              variant="extendedFab"
              aria-label="Delete"
              onClick={() => {
                this.toggleEmptyTrashDialog(true);
              }}
            >
              <DeleteIcon />
              &nbsp;Empty Trash
            </Button>
          </div>
        </Toolbar>
      </Fragment>
    );
  }

  render() {
    const { trash } = this.props;
    return (
      <div className="Maintenance">
        {this.renderToolbar()}
        <div className="items">
          {this.props.isLoading ? (
            <div className="loader">
              <SyncLoader color={"#2196f3"} loading size={25} />
            </div>
          ) : this.props.trash.length === 0 ? (
            <div className="emptyMessage">
              <img src={emptyImage} alt="empty" className="emptyImage" />
              <h1>Trash is empty</h1>
            </div>
          ) : (
            trash.map(data => (
              <div className="card" key={`preview-${data.linkId}`}>
                <MediaCard
                  title={data.title}
                  description={data.description}
                  image={data.image}
                  url={data.url}
                  author={data.author}
                  publisher={data.publisher}
                  id={data.linkId}
                  removeLink={() => {
                    this.toggleRemoveDialog(true, data.linkId);
                  }}
                  icon="delete_outline"
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trash: state.trash,
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getTrash: () => dispatch(getTrash()),
  deleteTrash: id => dispatch(deleteTrash(id)),
  deleteAll: () => dispatch(deleteAll()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Maintenance);
