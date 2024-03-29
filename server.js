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

router.use(function(req, res, next) {
  console.log('Something\'s happening... ' + req.params);
  next();
});

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to Matt\'s node API'});
});

router.route('/users')
  .post(function(req, res) {
    var user = new User();
    user.name = req.body.name;

    user.save(function(err) {
      if(err) {
        res.send(err);
      }
      res.json({ message: 'User created!' })
    })
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) {
        res.send(err);
      }
      res.json(users);
    });
  });

router.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }
      res.json(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }
      user.name = req.body.name;
      user.save(function(err) {
        if(err) {
          res.send(err);
        }
        res.json({ message: 'User updated: ' + user.name});
      })
    })
  })
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if(err) {
        res.send(err)
      }
      res.json({ message: 'Successfully deleted user: ' + user.name })
    });
  });

// all of our routes will be prefixed by /api
app.use('/api', router);

app.listen(port);
console.log('Spying on port ' + port);
