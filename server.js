var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./app/models/user');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017');

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Matt\'s node API'});
});

// all of our routes will be prefixed by /api
app.use('/api', router);

app.listen(port);
console.log('Spying on port ' + port);
