/**
 *
 * Favourites
 *
 */

import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import tourImage from "../../assets/tour.svg";
import "./Favourites.css";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { getFavourites } from "./actions";
import { saveLink, bookmarkLink } from "../Links/actions";

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
        {this.props.favourites !== null &&
        this.props.favourites.length === 0 ? (
          <div className="onboarding">
            <img src={tourImage} alt="tour" className="noFavImage" />
            <h1>Get started with adding new links</h1>
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
            <FormDialog
              isActive={this.state.isActive}
              toggleStatus={this.onToggleStatus}
              categories={this.props.categories}
              saveLink={this.props.saveLink}
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
                      this.props.bookmarkLink(data.linkId, data.isFavourite);
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
});

const mapDispatchToProps = dispatch => ({
  getFavourites: () => dispatch(getFavourites()),
  saveLink: link => dispatch(saveLink(link)),
  bookmarkLink: (id, status) => dispatch(bookmarkLink(id, status)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
