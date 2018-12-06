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

router.post('/register',  async function (req, res, next) {
  console.log(req.body)
  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    role_id: req.body.role_id || await Role.findOne({"name": "customer" })._id
  });

  newUser.setPassword(req.body.password);
  newUser.save(function (err) {
    if (err) throw err;
  });
  res.send({ user: newUser });
});


router.post("/authenticate", async function(req, res, next) {
  user = await User.findOne({ username: req.body.username })
  role = await Role.findOne({_id: user.role_id})
  obj = { name: user.name, email: user.email, role: role.name}
  res.send(obj)
});

module.exports = router;
