import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import GmailDesktop from './app.js';
import Login from './Login/login.js';

const routes = (
  <Router>
    <Route name="app" path="/" component={GmailDesktop}>
      <IndexRoute component={Login}/>
      <Route name="auth" path="auth"/>
    </Route>
  </Router>
);

export default routes;
