const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', '.');

app.get('*', function(req, res) {
  res.send('index');
});

app.listen(port, function(error) {
  if(error) {
    console.log('Error with server.', error);
  } else {
    console.log('Listening to port', port);
  }
});
