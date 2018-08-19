import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";

//components
import MediaCard from "../../components/MediaCard";
import FormDialog from "../../components/FormDialog";

//actions
import { getLinkData, saveLink, removeLink, loadHome } from "./actions";

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

  componentDidMount() {
    this.props.loadHome();
  }

  onToggleStatus(status) {
    this.setState({
      isActive: status,
    });
  }

  render() {
    const { previewList } = this.props;
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
        <Divider />
        <FormDialog
          isActive={this.state.isActive}
          toggleStatus={this.onToggleStatus}
          categories={this.props.categories}
          saveLink={this.props.saveLink}
        />
        {previewList.map(data => (
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
    );
  }
}

const mapStateToProps = state => ({
  previewList: state.home.previewList,
  categories: state.app.categories,
});

const mapDispatchToProps = dispatch => ({
  getLinkData: category => dispatch(getLinkData(category)),
  saveLink: link => dispatch(saveLink(link)),
  removeLink: id => dispatch(removeLink(id)),
  loadHome: () => dispatch(loadHome()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
