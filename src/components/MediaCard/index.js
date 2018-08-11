import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  card: {
    display: "flex",
    width: 400,
    height: 200,
    cursor: "pointer"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 200,
    height: 200
  }
});

function MediaCard(props) {
  const { classes, title, description, url, author, publisher, id } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.cover} image={props.image} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="title">
              {title.length > 25 ? title.substring(0, 25) + "..." : title}
            </Typography>
            <Typography variant="subheading" color="textSecondary" gutterBottom>
              By {author === null ? publisher : author}
            </Typography>
            <Typography component="p" gutterBottom>
              {description.length > 60
                ? description.substring(0, 60) + "..."
                : description}
            </Typography>
            <Typography component="p" variant="body2">
              {url}
            </Typography>
          </CardContent>
        </div>
        <IconButton>
          <CloseIcon
            onClick={() => {
              props.removeLink(id);
            }}
          />
        </IconButton>
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
  removeLink: PropTypes.func
};

export default withStyles(styles, { withTheme: true })(MediaCard);
