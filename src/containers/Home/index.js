import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Icon, Toolbar } from "@material-ui/core";

//components
import PreviewLink from "../../components/PreviewLink";

//css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderLinks = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(t => (
      <div className="card" key={`preview-${t}`}>
        <PreviewLink url="http://newco.app" />
      </div>
    ));
  };

  renderCategories = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => (
      <Button key={`category-${t}`}>SEO</Button>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
