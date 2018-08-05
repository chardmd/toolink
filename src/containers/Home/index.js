import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Toolbar } from "@material-ui/core";

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
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => (
      <Button key={`category-${t}`}>Web Development</Button>
    ));
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
