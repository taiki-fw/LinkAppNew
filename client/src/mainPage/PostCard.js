import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { FromName, PostWrapper, CenterDiv } from "../components/style.js";

import Input from "../Functional/Input";
import SubmitBtn from "../Functional/Submit";

import { addLinkCard } from "../reducer/modules/linkCards";

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: "",
      errorMessage: {
        title: "",
        url: ""
      },
      isDisabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.post = this.post.bind(this);
  }

  checkTitle(value) {
    const maxLength = 20;
    if (value.length > maxLength) {
      return `20文字以内にしてください。(現在${value.length}文字))`;
    } else if (value.length <= 0) {
      return `必須項目に必ずご記入ください`;
    } else return "";
  }

  checkUrl(value) {
    const regex = new RegExp(
      /^https?(:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)$/
    );

    if (value.length <= 0) {
      return `必須項目に必ずご記入ください`;
    } else if (!regex.test(value)) {
      return "リンクを貼ってください";
    } else return "";
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    const errorMessage = this.state.errorMessage;
    switch (name) {
      case "title":
        errorMessage["title"] = this.checkTitle(newValue);
        break;
      case "url":
        errorMessage["url"] = this.checkUrl(newValue);
        break;
      default:
        break;
    }
    this.setState({
      [name]: newValue,
      errorMessage: errorMessage,
      isDisabled: errorMessage.title && errorMessage.url
    });
  }

  post() {
    const state = this.state;
    if (
      state.title &&
      state.url &&
      !(state.errorMessage.title && state.errorMessage.url)
    ) {
      this.props.addLinkCard({
        title: this.state.title,
        comment: this.state.comment,
        url: this.state.url
      });
      this.props.history.push("/");
    } else {
      this.setState({
        errorMessage: {
          title: this.checkTitle(this.state.title),
          url: this.checkUrl(this.state.url)
        },
        isDisabled: true
      });
    }
  }

  render() {
    return (
      <>
        <PostWrapper>
          <FromName>新規投稿</FromName>
          <Input
            inputName="見出し"
            need={true}
            type="text"
            value={this.state.title}
            name="title"
            handleChange={this.handleChange}
            errMsg={this.state.errorMessage.title}
          />
          <br />
          <Input
            inputName="コメント"
            type="text"
            value={this.state.comment}
            name="comment"
            handleChange={this.handleChange}
          />
          <br />
          <Input
            inputName="URL"
            need={true}
            type="text"
            value={this.state.url}
            name="url"
            handleChange={this.handleChange}
            errMsg={this.state.errorMessage.url}
          />
          <br />
          <CenterDiv>
            <SubmitBtn
              handleSubmit={this.post}
              isDisabled={this.state.isDisabled}
            />
          </CenterDiv>
        </PostWrapper>
        <Link to="/" style={styles.Link}>
          キャンセル
        </Link>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { isFetching: state.linkCards.isFetching };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addLinkCard }, dispatch);
};

const styles = {
  Link: {
    display: "block",
    textDecoration: "none",
    color: "#0D3F67",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "0.5em 1.5em 0.5em 0",
    textAlign: "center"
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostCard)
);
