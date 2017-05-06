import React, { Component } from 'react';

class ShowInput extends Component {
  render() {
    return (
      <div>
        if (this.props.isActive) {
          <input className="usernameInput"
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleUsernameChange}
          />
          <br />
          <input className="replyInput"
              type="text"
              value={this.state.reply}
              placeholder="Reply"
              onChange={this.handleReplyChange}
          />
        }
      </div>
    );
  }
}

export default ShowInput;
