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
import FormDialog from "../../components/FormDialog";

//actions
import { getCategories } from "../Categories/actions";
import { saveLink } from "../Links/actions";
import { getFavourites } from "./actions";

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
    this.props.getCategories();
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  render() {
    return (
      <div className="Favourites">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  favourites: state.favourites,
});

const mapDispatchToProps = dispatch => ({
  saveLink: link => dispatch(saveLink(link)),
  getCategories: () => dispatch(getCategories()),
  getFavourites: () => dispatch(getFavourites()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
