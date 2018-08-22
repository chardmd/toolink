/**
 *
 * Trash
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";

import "./Trash.css";

class Trash extends React.Component {
  render() {
    return (
      <List
        component="nav"
        subheader={
          <ListSubheader className="subHeader" component="div">
            Maintenance
          </ListSubheader>
        }
      >
        <ListItem
          button
          component={Link}
          to="/maintenance/trash"
          className={`listItem ${this.props.isActive && "active"}`}
          onClick={() => {
            this.props.updateActiveItem(false, false, true);
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <Icon>delete</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    );
  }
}

Trash.propTypes = {
  updateActiveItem: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Trash;
