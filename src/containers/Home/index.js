import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";

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
      <ListItem button>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary="Web Development" />
      </ListItem>
    ));
    return <List component="nav">{content}</List>;
  };

  render() {
    return (
      <div className="Home">
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
        <div className="layout">
          <div className="side">
            <h3>Categories</h3>
            <div className="categories">{this.renderCategories()}</div>
            <br />
            <div>
              <Button variant="outlined">Add New Category</Button>
            </div>
          </div>
          <div className="main">
            <div className="inner">{this.renderLinks()}</div>
          </div>
        </div>
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
