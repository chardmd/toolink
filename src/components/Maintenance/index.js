/**
 *
 * Maintenance
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
import { withStyles } from "@material-ui/core/styles";

import "./Maintenance.css";

const INACTIVE = -1;

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: 300,
  },
  drawerPaper: {
    position: "relative",
  },
  toolbar: theme.mixins.toolbar,
});

class Maintenance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTrash: INACTIVE,
    };

    this.selectTrash = this.selectTrash.bind(this);
  }

  selectTrash(index) {
    this.setState({
      activeTrash: index,
    });
  }

  render() {
    const { classes } = this.props;
    const { activeTrash } = this.state;
    return (
      <List
        component="nav"
        className={classes.root}
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
          className={`listItem ${0 === activeTrash && "active"}`}
          onClick={() => {
            this.selectTrash(0);
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

Maintenance.propTypes = {
  activeTrash: PropTypes.string,
};

export default withStyles(styles)(Maintenance);
