var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../app/models/user')
var Role = require('../app/models/role')

var data = [{
  name: "Sandip",
  username: "admin",
  email: "sandip@gmail.com",
  role_id: 1,
  password: "sandip",
  salt: "123"
 }];

var UsersSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    return Model.create(data);
  }
});

module.exports = UsersSeeder;
