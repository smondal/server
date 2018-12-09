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
    if (err) res.send(err);
    else res.send(newProduct);
	})

});


router.delete('/:id',function(req,res, next){
	console.log(req.params.id);
	Product.find({_id:req.params.id }).remove().exec();
	res.send(req.params.id);
	// res.send("successfully delete product", 200);
});

module.exports = router;
