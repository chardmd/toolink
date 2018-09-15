/**
 *
 * FavItem
 *
 */

import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";

import "./FavItem.css";

class FavItem extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <List
        component="nav"
        subheader={
          <ListSubheader className="subHeader" component="div">
            Quick Access
          </ListSubheader>
        }
      >
        <ListItem
          button
          component={Link}
          to="/"
          className={`listItem ${location.pathname === "/" && "active"}`}
        >
          <ListItemAvatar>
            <Avatar>
              <Icon>favorite_border</Icon>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Favorites" />
        </ListItem>
      </List>
    );
  }
}

export default withRouter(FavItem);
