const google = require('googleapis');
const gmail = google.gmail('v1');

module.exports = {
  messages: (oauth2Client) => {
    gmail.users.messages.list({userId: 'me', auth: oauth2Client}, function(err, response) {
      console.log(response);
    });
  }
}
