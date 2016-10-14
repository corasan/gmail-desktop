import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

export default class Login extends Component {
  render() {
    return(
      <div>
        <h1>Login</h1>
        <a href="http://localhost:3000/auth">Authenticate</a>
      </div>
    );
  }
}
