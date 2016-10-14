const google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// Environment variables containing google credentials
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_url = process.env.REDIRECT_URL;

const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];

module.exports = function getNewToken(res) {
  const oauth2Client = new OAuth2(client_id, client_secret, redirect_url);

  const url = oauth2Client.generateAuthUrl({
    scope: scopes
  });

  res.redirect(url);
  console.log(url);
}
