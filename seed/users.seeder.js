var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../app/models/user')
var Role = require('../app/models/role')

var data = [{
  name: "Sandip",
  username: "admin",
  email: "sandip@gmail.com"
 }];

var UsersSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    var results = []
    data.forEach(function(data) {
      user_data = new Model(data)
      user_data.setPassword("password");
      console.log(user_data);
      user_data.save(function (err) {
          // console.log(err)
      })
    })

  //  return Model.create(data);
  }
});

module.exports = UsersSeeder;
