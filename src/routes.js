import { Router, Route, IndexRoute } from 'react-router';
import GmailDesktop from './app.js';

const routes = (
  <Router>
    <Route name="app" path="/" component={GmailDesktop}>
    </Route>
  </Router>
);
