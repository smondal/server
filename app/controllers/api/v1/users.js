var express = require('express');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
var router = express.Router();
var User = require('../../../models/user');
var Role = require('../../../models/role');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',  async function (req, res, next) {
  console.log(req.body)
  var newUser = new User(req.body)
  role = await Role.findOne({"name": "customer" })
  newUser.role_id = role.id;
  newUser.setPassword(req.body.password);
  newUser.save(function (err) {
    if (err)
    {
      res.send("Something wrong", 422);
    }
    else{

      res.send({ user: newUser });
    }
  });

});


router.post("/authenticate", async function(req, res, next) {
  user = await User.findOne({ username: req.body.username })
  if(user){
    role = await Role.findOne({id: user.role_id})
    var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
    obj = { name: user.name, email: user.email, role: role.name, token: token};
    res.send(obj)
  }else{
    res.send("Username and password are incorect", 422)
  }

});

module.exports = router;
