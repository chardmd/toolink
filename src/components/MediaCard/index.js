import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    display: "flex",
    width: 400,
    height: 180,
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
    height: 180
  }
});

function MediaCard(props) {
  const { classes, title, description, url, author, publisher } = props;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.cover} image={props.image} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="title">
              {title.length > 40 ? title.substring(0, 40) + "..." : title}
            </Typography>
            <Typography variant="subheading" color="textSecondary" gutterBottom>
              By {author === null ? publisher : author}
            </Typography>
            <Typography component="p" gutterBottom>
              {description.length > 80
                ? description.substring(0, 80) + "..."
                : description}
            </Typography>
            <Typography component="p" variant="body2">
              {url}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(MediaCard);
