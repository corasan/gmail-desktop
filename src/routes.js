import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import GmailDesktop from './app.js';
import Messages from './Messages/messages.js';

const routes = (
  <Router>
    <Route path="auth"/>
    <Route path="oauth2callback"/>
    <Route name="app" path="/" component={GmailDesktop}>
      <IndexRoute component={Messages}/>
    </Route>
  </Router>
);

export default routes;
