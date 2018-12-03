var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

 

  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  var newUser = User({
    name: 'Peter Quill',
    username: 'starlord55',
    password: 'password',
    admin: true
  });

  // save the user
  newUser.save(function (err) {
    if (err) throw err;
    console.log('User created!');
  });

  res.send('respond with a resource');
});

module.exports = router;
