var express = require('express');
var router = express.Router();
var User = require('../../../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function (req, res, next) {
  console.log(req.body)
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
  });
  newUser.setPassword(req.body.password);
  newUser.save(function (err) {
    if (err) throw err;
  });
  res.send({ user: newUser.toAuthJSON() });
});


router.post("/authenticate", function(req, res, next) {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user && user.validatePassword(req.body.password)){
      res.send(user)    
    }
    else{
      res.send("Unauthorized Access", 404)
    }
  })
});

module.exports = router;
