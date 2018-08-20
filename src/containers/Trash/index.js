/**
 *
 * Trash
 *
 */

import React from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import { getTrash, deleteTrash } from "./actions";

//components
import MediaCard from "../../components/MediaCard";
import RemoveDialog from "../../components/RemoveDialog";

import "./Trash.css";

export class Trash extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      removeDialogOpen: false,
      selectedLinkId: null,
    };

    this.handleRemoveDialog = this.handleRemoveDialog.bind(this);
    this.toggleRemoveDialog = this.toggleRemoveDialog.bind(this);
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

  render() {
    const { trash } = this.props;
    return (
      <div className="Trash">
        <Toolbar className="toolbox">
          <div>
            <Button variant="extendedFab" aria-label="Delete">
              <DeleteIcon />
              &nbsp;Empty Trash
            </Button>
          </div>
        </Toolbar>
        <RemoveDialog
          title={`Permanently delete this link?`}
          message={`You will permanently erase this link in the trash. You can't undo this action. Press 'delete' to continue.`}
          isActive={this.state.removeDialogOpen}
          onSave={this.handleRemoveDialog}
          onClose={() => {
            this.toggleRemoveDialog(false);
          }}
        />
        <div className="items">
          {trash.map(data => (
            <div className="card" key={`preview-${data.id}`}>
              <MediaCard
                title={data.title}
                description={data.description}
                image={data.image}
                url={data.url}
                author={data.author}
                publisher={data.publisher}
                id={data.id}
                removeLink={() => {
                  this.toggleRemoveDialog(true, data.id);
                }}
                icon="delete_outline"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trash: state.trash.data,
});

const mapDispatchToProps = dispatch => ({
  getTrash: () => dispatch(getTrash()),
  deleteTrash: id => dispatch(deleteTrash(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
