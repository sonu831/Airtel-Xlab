const express = require('express');
const router = express.Router();
const product_controller = require('../controllers/product.controller');

//CRUD routes

//create a product
router.post('/create', product_controller.product_create);

//get all product details
router.get('/all', product_controller.all_product_details);

//get a product's details
router.get('/:id', product_controller.product_details);

//update a product's details
router.put('/:id/update', product_controller.product_update);

//delete a product
router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;