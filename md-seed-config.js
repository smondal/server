var mongooseLib = require('mongoose');
var Users = require("./seed/users.seeder");
var Roles = require("./seed/roles.seeder");

mongooseLib.Promise = global.Promise || Promise;

module.exports = {

  // Export the mongoose lib
  mongoose: mongooseLib,

  // Export the mongodb url
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost/stockpile',

  /*
    Seeders List
    ------
    order is important
  */
  seedersList: {
    Roles,
    Users
  }
};
