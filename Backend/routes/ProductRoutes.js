const express = require ('express');
const { getAllproduct, createProducts, updateProduct, deletProduct } = require('../Controller/productController');



const router = express.Router();

router.route("/products").get(getAllproduct);

// create a products
router.route("/products/new").post(createProducts);

// update the product 
router.route("/products/update/:id").post(updateProduct);

// delet the producut
router.route("/products/delet/:id").delete(deletProduct);


module.exports =router