var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var crypto = require('crypto');
var Role = require("./role")

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
	name: String,
	email: String,
	username: String, //{ type: String, required: true, unique: true },
	password: String, //{ type: String, required: true },
	salt: String,
	role_id: String,
	created_at: Date,
	updated_at: Date
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
	const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
	return this.password === hash;
};

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
