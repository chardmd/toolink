import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

//components
import MediaCard from "../../components/MediaCard";

//actions
import { getLinkData } from "./actions";

//css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLinkData("seo");
  }

  renderLinks = () => {
    return this.props.previewList.map((data, index) => (
      <div className="card" key={`preview-${index}`}>
        <MediaCard
          title={data.title}
          description={data.description}
          image={data.image}
          url={data.url}
          author={data.author}
          publisher={data.publisher}
        />
      </div>
    ));
  };

  renderCategories = () => {
    const content = [1, 2, 3, 4, 5, 6].map(t => (
      <ListItem button className="listItem">
        <ListItemAvatar>
          <Avatar>
            <Avatar>WE</Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Web Development" />
      </ListItem>
    ));
    return (
      <List component="nav" className="list">
        {content}
      </List>
    );
  };

  render() {
    return (
      <div className="Home">
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Toolbar className="toolbox">
              <div>
                <Link to={`/notes/new`}>
                  <Button variant="outlined" size="large">
                    <Icon>add</Icon>&nbsp;
                    <span>Add Link</span>
                  </Button>
                </Link>
              </div>
            </Toolbar>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            md={3}
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="leftCol"
          >
            <br />
            <Typography variant="title" align="center">
              Categories
            </Typography>
            <div className="categories">{this.renderCategories()}</div>
            <br />
            <Button variant="outlined">Add New Category</Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={9}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="rightCol"
          >
            {this.renderLinks()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  previewList: state.home.previewList
});

const mapDispatchToProps = dispatch => ({
  getLinkData: category => dispatch(getLinkData(category))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
