import React from "react";
import request from "superagent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      url: ""
    };
  }

  handleChange(e) {
    const newValue = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: newValue
    });
  }

  // DBに保存したデータの取得テスト
  // get() {
  //   request.get("/api/getItems").end((err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log(data.body.logs);
  //   });
  // }

  post() {
    request
      .post("/api/link")
      .send({
        title: this.state.title,
        comment: this.state.comment,
        url: this.state.url
      })
      .end((err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      });
  }

  render() {
    return (
      <>
        <label>
          見出し
          <br />
          <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          コメント
          <br />
          <input
            type="text"
            value={this.state.comment}
            name="comment"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <label>
          URL
          <br />
          <input
            type="text"
            value={this.state.url}
            name="url"
            onChange={e => this.handleChange(e)}
          />
        </label>
        <br />
        <button onClick={e => this.post()}>送信</button>
        <button onClick={e => this.get()}>取得</button>
      </>
    );
  }
}

export default App;
