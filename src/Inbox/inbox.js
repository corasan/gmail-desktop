import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import $ from 'jquery';

export default class Inbox extends Component {
  componentWillMount() {
    $.get('/api/retrieve-inbox', (data) => {
      console.log(data);
    })
  }
  render() {
    return(
      <div>
        <h1>Inbox</h1>
      </div>
    );
  }
}
