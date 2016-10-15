const google = require('googleapis');
const gmail = google.gmail('v1');
const request = require('request');
const c = require('./constants');
const fs = require('fs');

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(c.CLIENT_ID, c.CLIENT_SECRET, c.REDIRECT_URL);

fs.readFile(c.TOKEN_PATH, (err, result) => {
  if (err) throw err;
  oauth2Client.setCredentials(JSON.parse(result));
});

module.exports = {
  messages: (res) => {
    gmail.users.messages.list({userId: 'me', auth: oauth2Client}, function(err, result) {
      res.json(result);
    });
  }
}
