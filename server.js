var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencode({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Matt\'s node API'});
});

// all of our routes will be prefixed by /api
app.use('/api', router);

app.listen(port);
console.log('Spying on port ' + port);