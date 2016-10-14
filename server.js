const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', '.');

app.use(express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
  console.log('hi from index');
  res.render('index');
});

app.get('/auth', function(req, res) {
  console.log('hello');
});

app.listen(port, function(error) {
  if(error) {
    console.log('Error with server.', error);
  } else {
    console.log('Listening to port', port);
  }
});
