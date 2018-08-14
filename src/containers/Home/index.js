import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Toolbar } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";
import CategoryList from "../../components/CategoryList";

//actions
import {
  getLinkData,
  getCategories,
  saveLink,
  removeLink,
  addCategory,
  removeCategory,
  renameCategory,
  loadHome
} from "./actions";

//css
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };

    this.onToggleStatus = this.onToggleStatus.bind(this);
  }

  componentDidMount() {
    this.props.loadHome();
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
          id={data.id}
          removeLink={this.props.removeLink}
        />
      </div>
    ));
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
          saveLink={this.props.saveLink}
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
                  <Icon>link</Icon>
                  &nbsp;
                  <span>Add Link</span>
                </Button>
              </div>
            </Toolbar>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            className="leftCol"
          >
            <br />
            <CategoryList
              categories={this.props.categories}
              addCategory={this.props.addCategory}
              removeCategory={this.props.removeCategory}
              renameCategory={this.props.renameCategory}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
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
  //getCategories: () => dispatch(getCategories()),
  saveLink: link => dispatch(saveLink(link)),
  removeLink: id => dispatch(removeLink(id)),
  addCategory: category => dispatch(addCategory(category)),
  removeCategory: id => dispatch(removeCategory(id)),
  renameCategory: (id, text) => dispatch(renameCategory(id, text)),
  loadHome: () => dispatch(loadHome())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
