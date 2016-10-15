const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
require('dotenv').config();
const fs = require('fs');
const auth = require('./utils/auth');

const TOKEN_DIR = process.env.HOME || process.env.HOMEPATH;
const TOKEN_PATH = TOKEN_DIR + '\\' + 'gmail-desktop.json';

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

const wdm = webpackDevMiddleware(compiler, {
  // path: config.output.path,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});

app.set('view engine', 'ejs');
app.set('views', '.');

app.use(wdm);
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req, res) {
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      auth.authenticate(res);
    } else {
      console.log('Token at get /:', JSON.parse(token));
      auth.alreadyAuth(JSON.parse(token));
      res.render('index');
    }
  });
});

app.get('/oauth2callback', function(req, res) {
  auth.receiveToken(res);
});

app.listen(port, function(error) {
  if(error) {
    console.log('Error with server.', error);
  } else {
    console.log('Listening to port', port);
  }
});
