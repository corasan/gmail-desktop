import React, { Component } from 'react';

export default class GmailDesktop extends Component {
  render() {
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}
