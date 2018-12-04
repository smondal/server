var express = require('express');
var router = express.Router();
var User = require('../../../models/user');
var Role = require('../../../models/role');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function findrole(req, res, next){
  if (req.body.role_id)
    return
  else{
    Role.findOne({"name": "customer" }, function (err, obj) {
      if (err){
        next();
      }
      else
      {
        req.body["role_id"] = obj._id
        next();
      }
    })
  }
}

router.post('/register',  findrole, function (req, res, next) {
  console.log(req.body)
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    role_id: req.body.role_id
  });

  newUser.setPassword(req.body.password);
  newUser.save(function (err) {
    if (err) throw err;
  });
  res.send({ user: newUser });
});


router.post("/authenticate", function(req, res, next) {
  User.findOne({ username: req.body.username }).then((user) => {
    if (user && user.validatePassword(req.body.password)){
      let is_admin = user.is_admin() || false
      obj = { name: user.name, email: user.email, is_admin: is_admin }
      res.send(obj)    
    }
    else{
      res.send("Username and Password are incorrect", 404)
    }
  })
});

module.exports = router;
