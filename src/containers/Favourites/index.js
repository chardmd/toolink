/**
 *
 * Favourites
 *
 */

import React, { Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import { SyncLoader } from "react-spinners";

import tourImage from "../../assets/tour.svg";
import "./Favourites.css";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { getFavourites, removeFavourites } from "./actions";
import { saveLink } from "../Links/actions";

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

export class Favourites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.onToggleStatus = this.onToggleStatus.bind(this);
    this.renderOnboarding = this.renderOnboarding.bind(this);
    this.renderToolbar = this.renderToolbar.bind(this);
  }

  componentDidMount() {
    this.props.getFavourites();
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  renderToolbar() {
    return (
      <Fragment>
        <FormDialog
          isActive={this.state.isActive}
          toggleStatus={this.onToggleStatus}
          categories={this.props.categories}
          saveLink={this.props.saveLink}
          activeCategoryId={""}
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
              disabled={this.props.categories.length === 0 ? true : false}
            >
              <Icon>link</Icon>
              &nbsp;
              <span>Add Link</span>
            </Button>
          </div>
        </Toolbar>
      </Fragment>
    );
  }

  renderOnboarding() {
    return (
      <div className="onboarding">
        <img src={tourImage} alt="tour" className="noFavImage" />
        {this.props.categories.length === 0 ? (
          <h1>Add a new category to get started</h1>
        ) : (
          <h1>Save Link to Favorites</h1>
        )}
      </div>
    );
  }

  render() {
    return (
      <div className="Favourites">
        {this.renderToolbar()}
        <div className="items">
          {this.props.isLoading ? (
            <div className="loader">
              <SyncLoader color={"#2196f3"} loading size={25} />
            </div>
          ) : this.props.favourites.length === 0 ? (
            this.renderOnboarding()
          ) : (
            this.props.favourites.map(data => (
              <div className="card" key={`preview-${data.linkId}`}>
                <MediaCard
                  title={data.title}
                  description={data.description}
                  image={data.image}
                  url={data.urlText}
                  author={data.author}
                  publisher={data.publisher}
                  id={data.linkId}
                  onClick={() => {
                    openInNewTab(data.urlText);
                  }}
                  bookmark
                  isFavourite={data.isFavourite}
                  bookmarkLink={() => {
                    this.props.removeFavourites(data.linkId);
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
  favourites: state.favourites,
  isLoading: state.app.isLoading,
});

const mapDispatchToProps = dispatch => ({
  getFavourites: () => dispatch(getFavourites()),
  saveLink: (link, categoryId, isFavorite) =>
    dispatch(saveLink(link, categoryId, isFavorite)),
  removeFavourites: id => dispatch(removeFavourites(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
