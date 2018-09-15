/**
 *
 * Favourites
 *
 */

import React, { Fragment } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
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
  }

  componentDidMount() {
    this.props.getFavourites();
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  render() {
    return (
      <div className="Favourites">
        {this.props.isLoading ? (
          <div className="loader">
            <SyncLoader color={"#2196f3"} loading size={25} />
          </div>
        ) : this.props.favourites.length === 0 ? (
          <div className="onboarding">
            <img src={tourImage} alt="tour" className="noFavImage" />
            {this.props.categories.length === 0 ? (
              <h1>Add a new category to get started</h1>
            ) : (
              <Fragment>
                <h1>Save Link to Favorites</h1>
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
              </Fragment>
            )}

            <FormDialog
              isActive={this.state.isActive}
              toggleStatus={this.onToggleStatus}
              categories={this.props.categories}
              saveLink={this.props.saveLink}
              activeCategoryId={""}
            />
          </div>
        ) : (
          <div className="items">
            {this.props.favourites !== null &&
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
              ))}
          </div>
        )}
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
  saveLink: (link, categoryId) => dispatch(saveLink(link, categoryId)),
  removeFavourites: id => dispatch(removeFavourites(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
