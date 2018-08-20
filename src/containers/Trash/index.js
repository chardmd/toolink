/**
 *
 * Trash
 *
 */

import React from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";

import { getTrash } from "./actions";

//components
import MediaCard from "../../components/MediaCard";

import "./Trash.css";

export class Trash extends React.Component {
  componentDidMount() {
    this.props.getTrash();
  }

  render() {
    const { trash } = this.props;
    return (
      <div className="Trash">
        <Toolbar className="toolbox">
          <div>
            <Button variant="extendedFab" aria-label="Delete">
              <DeleteIcon /> Empty Trash
            </Button>
          </div>
        </Toolbar>
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
                removeLink={this.props.removeLink}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trash);
