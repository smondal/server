var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));

// create a schema
var ProductSchema = new Schema({
  name: String,
  description: String,
  type: String,
  price: Number
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
