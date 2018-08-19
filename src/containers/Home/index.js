import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { loadHome } from "./actions";
import { getCategories } from "../Categories/actions";
import { getCategoryLinks, saveLink, removeLink } from "../Links/actions";

//css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };

    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  componentWillMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    //load the data of first category
    const categoryId = parseInt(nextProps.match.params.categoryId, 10);
    if (
      this.props.categories !== nextProps.categories &&
      nextProps.categories.length !== 0
    ) {
      const firstCategory = isNaN(categoryId)
        ? nextProps.categories[0]
        : nextProps.categories.find(c => c.id === categoryId);
      if (firstCategory !== null) {
        this.props.getCategoryLinks(firstCategory.id);
      }
    }
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  render() {
    const { links } = this.props;
    return (
      <div className="Home">
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
              <Icon>link</Icon>
              &nbsp;
              <span>Add Link</span>
            </Button>
          </div>
        </Toolbar>
        <FormDialog
          isActive={this.state.isActive}
          toggleStatus={this.onToggleStatus}
          categories={this.props.categories}
          saveLink={this.props.saveLink}
        />
        <div className="items">
          {links.map(data => (
            <div className="card" key={`preview-${data.id}`}>
              <MediaCard
                title={data.title}
                description={data.description}
                image={data.image}
                url={data.url}
                author={data.author}
                publisher={data.publisher}
                id={data.id}
                removeLink={this.props.removeLink}
              />
            </div>
          ))}
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
  saveLink: link => dispatch(saveLink(link)),
  removeLink: id => dispatch(removeLink(id)),
  loadHome: () => dispatch(loadHome()),
  getCategoryLinks: categoryId => dispatch(getCategoryLinks(categoryId)),
  getCategories: () => dispatch(getCategories()),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Home);
