import React, { Component } from 'react';
import Reply from './Reply';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../css/BoardComment.css';

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

class BoardComment extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      reply: '',
      active: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleReplyChange = this.handleReplyChange.bind(this);
    this.handleAddReply = this.handleAddReply.bind(this);
    this.handleReplyButtonClick = this.handleReplyButtonClick.bind(this);
  }
  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  handleReplyChange(event) {
    this.setState({
      reply: event.target.value,
    });
  }
  handleAddReply(event) {
    if (event.keyCode === 13 && this.state.username !== ''
                             && this.state.reply !== '') {
      this.props.addReply(
        this.props.post.id,
        this.state.username,
        this.state.reply,
      );
      this.setState({
        username: '',
        reply: '',
        active: false,
      });
    }
  }
  handleReplyButtonClick() {
    let isActive = this.state.active;
    if (isActive)
      isActive = false;
    else
      isActive = true;
    this.setState({
      active: isActive,
    });
  }
  render() {
    return (
      <div>
        <div className="onePost">
          <p className="username">
            {this.props.post.username}
          </p>
          <p className="time">
            {this.props.post.time}
          </p>
          <p className="comment">
            {this.props.post.comment}
          </p>
          <RaisedButton className="replyButton"
            label="Reply"
            secondary={true}
            onClick={this.handleReplyButtonClick}
            style={styles.raisedButton}
          />
        </div>
        <ul className="replyList">
        {this.props.post.replies.map(reply =>
          <Reply
            key={reply.id}
            reply={reply}
          />
        )}
        {this.state.active
          ? (
            <div>
              <TextField className="usernameInput"
                value={this.state.username}
                hintText="Username"
                onChange={this.handleUsernameChange}
                onKeyDown={this.handleAddReply}
              />
              <br />
              <TextField className="replyInput"
                value={this.state.reply}
                hintText="Reply"
                onChange={this.handleReplyChange}
                onKeyDown={this.handleAddReply}
              />
            </div>
          )
          : ( <div></div> )
        }
        </ul>
      </div>
    );
  }
}

export default BoardComment;

