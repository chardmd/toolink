import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { matchPath } from "react-router";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { loadHome } from "./actions";
import { getCategories } from "../Categories/actions";
import {
  getCategoryLinks,
  saveLink,
  removeLink,
  bookmarkLink,
} from "../Links/actions";

//css
import blankImage from "../../assets/blank.svg";
import "./Home.css";

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      categoryId: this.props.match.params.categoryId,
    };

    this.onToggleStatus = this.onToggleStatus.bind(this);
    this.getActiveCategoryId = this.getActiveCategoryId.bind(this);
  }

  componentDidMount() {
    const activeCategoryId = this.props.match.params.categoryId;
    this.props.getCategoryLinks(activeCategoryId);
  }

  componentWillReceiveProps(nextProps) {
    const activeCategoryId = nextProps.match.params.categoryId;
    if (this.props.match.params.categoryId !== activeCategoryId) {
      this.props.getCategoryLinks(activeCategoryId);
    }
  }

  getActiveCategoryId() {
    const match = matchPath(this.props.location.pathname, {
      path: "/categories/:categoryId",
      exact: true,
      strict: false,
    });
    return match === null ? 0 : match.params.categoryId;
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  render() {
    const { links } = this.props;
    const categoryId = this.getActiveCategoryId();
    return (
      <div className="Home">
        <FormDialog
          isActive={this.state.isActive}
          toggleStatus={this.onToggleStatus}
          categories={this.props.categories}
          saveLink={this.props.saveLink}
          activeCategoryId={categoryId}
        />
        <Toolbar className="toolbox">
          <div>
            <Button
              variant="extendedFab"
              color="secondary"
              size="large"
              onClick={() => {
                this.onToggleStatus(true);
              }}
            >
              <Icon>link</Icon>
              &nbsp;
              <span>Add Link</span>
            </Button>
          </div>
        </Toolbar>
        <div className="items">
          {links.length === 0 ? (
            <img src={blankImage} alt="blank" className="noCategories" />
          ) : (
            links.map(data => (
              <div className="card" key={`preview-${data.linkId}`}>
                <MediaCard
                  title={data.title}
                  description={data.description}
                  image={data.image}
                  url={data.urlText}
                  author={data.author}
                  publisher={data.publisher}
                  id={data.linkId}
                  removeLink={() => {
                    this.props.removeLink(data.linkId);
                  }}
                  onClick={() => {
                    openInNewTab(data.urlText);
                  }}
                  icon="close"
                  bookmark
                  isFavourite={data.isFavourite}
                  bookmarkLink={() => {
                    this.props.bookmarkLink(data.linkId, data.isFavourite);
                  }}
                />
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  links: state.links,
  trash: state.trash,
});

const mapDispatchToProps = dispatch => ({
  saveLink: (link, categoryId) => dispatch(saveLink(link, categoryId)),
  removeLink: id => dispatch(removeLink(id)),
  loadHome: () => dispatch(loadHome()),
  getCategoryLinks: categoryId => dispatch(getCategoryLinks(categoryId)),
  getCategories: () => dispatch(getCategories()),
  bookmarkLink: (id, status) => dispatch(bookmarkLink(id, status)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
