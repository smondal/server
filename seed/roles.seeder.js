var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../app/models/role');

var data = [
  {
    id: 1,
    name: "admin",
    priority: 1,
    description: "This is admin role"
},
{   id: 2,
    name: "customer",
    priority: 2,
    description: "This is customer role"
}];

var RolesSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    return Model.create(data);
  }
});

module.exports = RolesSeeder;
