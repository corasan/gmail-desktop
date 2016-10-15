require('dotenv').config();
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const config = require('./webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const fs = require('fs');
const auth = require('./utils/auth');
const gmail = require('./utils/gmail');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const TOKEN_DIR = process.env.HOME || process.env.HOMEPATH;
const TOKEN_PATH = TOKEN_DIR + '\\' + 'gmail-token.json';


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

app.get('/', (req, res) => {
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      auth.authenticate(res);
    } else {
      auth.alreadyAuth(JSON.parse(token));
      res.render('index');
    }
  });
});

app.get('/inbox');

app.get('/api/retrieve-inbox', (req, res) => {
  gmail.messages(res);
});

app.get('/oauth2callback', (req, res) => {
  auth.receiveToken(res);
});

app.listen(port, (error) => {
  if(error) {
    console.log('Error with server.', error);
  } else {
    console.log('Listening to port', port);
  }
});
