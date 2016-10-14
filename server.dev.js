const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
require('dotenv').config();

const getNewToken = require('./utils/auth');

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
  res.render('index');
});

app.get('/auth', function(req, res) {
  getNewToken(res);
});

app.listen(port, function(error) {
  if(error) {
    console.log('Error with server.', error);
  } else {
    console.log('Listening to port', port);
  }
});
