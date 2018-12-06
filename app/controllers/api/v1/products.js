var express = require('express');
var router = express.Router();
var Product = require('../../../models/product');

router.get('/', function (req, res, next) {
	Product.find({}, function(err, products){
		res.send(products)
	})
});

router.post('/', function(req, res, next){
	let newProduct = new Product(req.body);

	newProduct.save(function(err) {
		if (err) throw err;
	})
	res.send(newProduct);
});


module.exports = router;
