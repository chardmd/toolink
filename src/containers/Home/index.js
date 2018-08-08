import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { getLinkData, getCategories } from "./actions";

//css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      isInputActive: false
    };

    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  componentDidMount() {
    this.props.getLinkData("seo");
    this.props.getCategories();
  }

  renderLinks = () => {
    return this.props.previewList.map(data => (
      <div className="card" key={`preview-${data.id}`}>
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
    const content = this.props.categories.map(category => (
      <ListItem button className="listItem" key={`category-${category.id}`}>
        <ListItemAvatar>
          <Avatar>
            <Avatar>{category.name.substring(0, 2).toUpperCase()}</Avatar>
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={category.name} />
      </ListItem>
    ));
    return (
      <List component="nav" className="list">
        {content}
      </List>
    );
  };

  renderCategoryInput = () => {
    this.setState({
      isInputActive: true
    });
  };

  onToggleStatus(status) {
    this.setState({
      isActive: status
    });
  }

  render() {
    return (
      <div className="Home">
        <FormDialog
          isActive={this.state.isActive}
          toggleStatus={this.onToggleStatus}
          categories={this.props.categories}
        />
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Toolbar className="toolbox">
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    this.onToggleStatus(true);
                  }}
                >
                  <Icon>link</Icon>&nbsp;
                  <span>Add Link</span>
                </Button>
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
            <div>
              {this.state.isInputActive && (
                <TextField
                  id="search"
                  InputLabelProps={{
                    shrink: true
                  }}
                  label="New Category"
                  type="search"
                  className="textField"
                  margin="normal"
                  fullWidth
                  autoFocus
                />
              )}
            </div>
            <Button
              color="secondary"
              size="large"
              onClick={this.renderCategoryInput}
            >
              <Icon>add</Icon>&nbsp;
              <span>Add Category</span>
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={9}
            container
            direction="row"
            justify="center"
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
  previewList: state.home.previewList,
  categories: state.home.categories
});

const mapDispatchToProps = dispatch => ({
  getLinkData: category => dispatch(getLinkData(category)),
  getCategories: () => dispatch(getCategories())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
