import React, { Component } from 'react';
import BoardComment from './BoardComment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../css/Board.css';

const styles = {
  textField: {
    height: 30,
    width: 200,
    fontSize: 20,
  },
  raisedButton: {
    height: 25,
    width: 100,
  }
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      username: '',
      comment: '',
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handlePostButtonClick = this.handlePostButtonClick.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
  }
  componentDidMount() {
    fetch('/api/comments')
      .then(res => res.json())
      .then(p => this.setState({ posts: p }))
      .catch(err => console.error(err));
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleCommentChange(event) {
    this.setState({
      comment: event.target.value,
    });
  }
  handlePostButtonClick() {
    if (this.state.username !== '' && this.state.comment !== '') {
      const posts = this.state.posts;
      posts.push({
        id: this.state.posts.length,
        username: this.state.username,
        comment: this.state.comment,
        time: Date(),
        replies: [],
      });
      fetch('/api/comments', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: this.state.posts.length - 1,
          username: this.state.username,
          comment: this.state.comment,
          time: Date(),
          replies: [],
        }),
      });
      this.setState({
        posts: posts,
        username: '',
        comment: '',
      });
    }
  }
  handleAddReply(postID, nowUsername, nowReply) {
    const post = this.state.posts[postID];
    post.replies.push({
      id: post.replies.length,
      username: nowUsername,
      reply: nowReply,
      time: Date(),
    });
    fetch('/api/reply', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postID: postID,
        id: post.replies.length - 1,
        username: nowUsername,
        reply: nowReply,
        time: Date(),
      }),
    });
  }
  render() {
    return (
      <div className="board">
        <h1 className="boardTitle">Board</h1>
        <div className="usernameInput">
          <TextField
            value={this.state.username}
            hintText="Username"
            onChange={this.handleUsernameChange}
          />
        </div>
        <div className="commentInput">
          <TextField
            value={this.state.comment}
            hintText="Comment"
            onChange={this.handleCommentChange}
          />
        </div>
        <div className="postButton">
          <RaisedButton
            label="Post"
            secondary={true}
            onClick={this.handlePostButtonClick}
            style={styles.raisedButton}
          />
        </div>
        <ul className="postsList">
        {this.state.posts.map(post =>
          <div className="replyList" key={post.id}>
            <BoardComment
              key={post.id}
              post={post}
              addReply={this.handleAddReply}
            />
          </div>
        )}
        </ul>
      </div>
    );
  }
}

export default Board;

