const Product = require('../models/product.model');

//create a product
exports.product_create = function (req, res) {
    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

//get a product's details
exports.product_details = function (req, res) {
    Product.find({id: req.params.id}, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//get all product details
exports.all_product_details = function (req, res) {
    Product.find({}, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

//update a product's details
exports.product_update = function (req, res) {
    Product.findOneAndUpdate({id: req.params.id}, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

//delete a product
exports.product_delete = function (req, res) {
    Product.findOneAndRemove({id: req.params.id}, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
