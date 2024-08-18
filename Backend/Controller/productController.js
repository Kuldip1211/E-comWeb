
const Product = require("../models/Productcontroller");
const ErrorHandler = require("../utils/errorhandle");
const catchAsyncerror = require("../middleware/catchAsyncerror");

exports.createProducts = catchAsyncerror(async (req, res) => {
  const pro = req.body;

  const product = await Product.create(pro);

  res.status(201).json({
    success: true,
    product,
  });
});

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
exports.updateProduct = async (req, res ,next) => {
  const productId = req.params.id;
  const updatedData = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updatedData,
    { new: true }
  );

  if (!updatedProduct) {
    return next(new ErrorHandler("product not font" , 404))
  } else {
    res.json({
      success: true,
    });
  }
};

// delet the product
exports.deletProduct = async (req, res , next) => {
  const productId = req.params.id;

  const updatedProduct = await Product.findByIdAndDelete(productId);

  if (!updatedProduct) {
    return next(new ErrorHandler("product not font" , 404))
  }


    res.json({
      success: true,
      updatedProduct
    });
  

};

exports.detailProduct = async (req, res,next) => {
  const productId = req.params.id;

  const updatedProduct = await Product.findById(productId);

  if (!updatedProduct) {
    return next(new ErrorHandler("product not found" , 404))
  } 
    res.json({
      success: true,
      updatedProduct
    });
  
};

