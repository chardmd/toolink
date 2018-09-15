import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";

import "./MediaCard.css";

const styles = theme => ({
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 200,
    height: 200,
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    fontSize: 13,
  },
});

function MediaCard(props) {
  const { classes, title, description, url, author, publisher } = props;
  return (
    <div className="MediaCard">
      <Card className="card">
        <div className="content" onClick={props.onClick}>
          <CardMedia className={classes.cover} image={props.image || "todo"} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="title">{title}</Typography>
              <Typography
                variant="subheading"
                color="textSecondary"
                gutterBottom
              >
                By {author === null ? publisher : author}
              </Typography>
              <Typography component="p" gutterBottom>
                {description && description.length > 60
                  ? description.substring(0, 60) + "..."
                  : description}
              </Typography>
              <Typography component="p" variant="body2">
                {url && url.length > 25 ? url.substring(0, 25) + "..." : url}
              </Typography>
            </CardContent>
          </div>
        </div>
        <div className="actions">
          {props.icon && (
            <Tooltip title="Remove" classes={{ tooltip: classes.lightTooltip }}>
              <Icon className="icon" onClick={props.removeLink}>
                {props.icon}
              </Icon>
            </Tooltip>
          )}
          {props.bookmark && (
            <Tooltip
              title={`${
                props.isFavourite === true ? "Undo Favourite" : "Favourite"
              }`}
              classes={{ tooltip: classes.lightTooltip }}
            >
              <Icon
                className="icon"
                color={props.isFavourite === true ? "secondary" : "inherit"}
                onClick={props.bookmarkLink}
              >
                favorite_outline
              </Icon>
            </Tooltip>
          )}
        </div>
      </Card>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  removeLink: PropTypes.func,
  icon: PropTypes.string,
  bookmark: PropTypes.bool,
  isFavourite: PropTypes.bool,
  bookmarkLink: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(MediaCard);
