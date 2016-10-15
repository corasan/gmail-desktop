const google = require('googleapis');
const fs = require('fs');
const gmail = require('./gmail');

const OAuth2 = google.auth.OAuth2;

// Environment variables containing google credentials
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_url = process.env.REDIRECT_URL;

// Path to save google token
const TOKEN_DIR = process.env.HOME || process.env.HOMEPATH;
const TOKEN_PATH = TOKEN_DIR + '\\' + 'gmail-desktop.json';

const oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

// Function to save the token locally
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

module.exports = {
  authenticate: function(response) {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      approval_prompt: 'force',
      scope: scopes
    });
    response.redirect(url);
  },

  alreadyAuth: function(token) {
    oauth2Client.setCredentials(token);

    gmail.messages(oauth2Client);
  },

  receiveToken: function(response) {
    const code = response.req.query.code
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      storeToken(token);
      response.redirect('/');
    });
  }
}
