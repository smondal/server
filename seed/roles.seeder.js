var Seeder = require('mongoose-data-seed').Seeder;
var Model = require('../app/models/role');

var data = [
  {
    name: "admin",
    priority: 1,
    description: "This is admin role"
},
{
    name: "customer",
    priority: 2,
    description: "This is customer role"
}];

console.log(data)

var RolesSeeder = Seeder.extend({
  shouldRun: function () {
    return Model.countDocuments().exec().then(count => count === 0);
  },
  run: function () {
    console.log(data)
    return Model.create(data);
  }
});

module.exports = RolesSeeder;
