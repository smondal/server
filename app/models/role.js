var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

// create a schema
var RoleSchema = new Schema({
	id: Number,
	name: String,
	description: String,
	priority: Number
});

RoleSchema.statics.search = function (name, cb) {
  return this.where("name", new RegExp(name, 'i')).exec(cb)
} 

var Role = mongoose.model('Role', RoleSchema);

module.exports = Role;