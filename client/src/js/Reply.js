import React, { Component } from 'react';
import '../css/Reply.css';

class Reply extends Component {
  render() {
    return (
      <div className="oneReply">
        <p className="reply"
        >
          {this.props.reply.reply}
        </p>
        <p className="username">
          Posted by {this.props.reply.username}
        </p>
        <p className="time">
          {this.props.reply.time}
        </p>
      </div>
    );
  }
}

export default Reply;
