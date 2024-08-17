const Product = require("../models/Productcontroller");

exports.createProducts = async (req, res) => {
  const pro = req.body;

  const product = await Product.create(pro);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllproduct = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// update the products
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).send("Product not found");
  } else {
    res.json({
      success: true,
    });
  }
};

// delet the product
exports.deletProduct = async (req, res) => {
  const productId = req.params.id;

  const updatedProduct = await Product.findByIdAndDelete(productId);

  if (!updatedProduct) {
    return res.status(404).send("Product not found");
  } else {
    res.json({
      success: true,
      updatedProduct
    });
  }
};

