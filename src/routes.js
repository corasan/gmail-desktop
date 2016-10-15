import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import GmailDesktop from './app.js';
import Inbox from './Inbox/inbox.js';

const routes = (
  <Router>
    <Route path="auth"/>
    <Route path="oauth2callback"/>
    <Route path="api/retrieve-inbox"/>
    <Route name="app" path="/" component={GmailDesktop}>
      <IndexRoute component={Inbox}/>
    </Route>
  </Router>
);

export default routes;
