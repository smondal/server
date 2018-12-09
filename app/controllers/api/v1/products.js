var express = require('express');
var router = express.Router();
var Product = require('../../../models/product');
var verify_token = require('../../../middleware/verify_token')

console.log(verify_token);

router.get('/', verify_token,  function (req, res, next) {
	Product.find({}, function(err, products){
		res.send(products)
	})
});



router.post('/', verify_token, function(req, res, next){
  if(req.role === 'admin'){
    let newProduct = new Product(req.body);
    newProduct.save(function(err) {
      if (err) res.send(err);
      else res.send(newProduct);
    })
  }else{
    res.status(401).send("Unauthorized Access");
  }


});


router.delete('/:id', verify_token, function(req,res, next){
  if(req.role === 'admin'){
    Product.find({_id:req.params.id }).remove().exec();
    res.send(req.params.id);
  }
  else{
    res.status(401).send("Unauthorized Access");
  }
	// res.send("successfully delete product", 200);
});

module.exports = router;
