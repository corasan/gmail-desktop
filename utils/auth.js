const google = require('googleapis');
const fs = require('fs');
const gmail = require('./gmail');
const c = require('./constants');

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(c.CLIENT_ID, c.CLIENT_SECRET, c.REDIRECT_URL);

// Function to save the token locally
storeToken = (token) => {
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
  authenticate: (response) => {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      approval_prompt: 'force',
      scope: c.SCOPES
    });
    response.redirect(url);
  },

  alreadyAuth: (token) => {
    oauth2Client.setCredentials(token);
    gmail.messages(oauth2Client);
  },

  receiveToken: (response) => {
    const code = response.req.query.code
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      storeToken(token);
      response.redirect('/');
    });
  },
}
