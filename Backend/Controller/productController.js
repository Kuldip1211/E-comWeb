
const Product = require("../models/Productcontroller");
const ErrorHandler = require("../utils/errorhandle");
const catchAsyncerror = require("../middleware/catchAsyncerror");
const Apifecture = require("../utils/apifilter")

exports.createProducts = catchAsyncerror(async (req, res) => {
  const pro = req.body;

  const product = await Product.create(pro);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllproduct = catchAsyncerror(async (req, res) => {
  try {
    // Fetch all products from the database
    const resultpages = 3;
    const apiFeacture = new Apifecture(Product.find(),req.query).search().filter().pagination(resultpages);
    const products = await apiFeacture.query;
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
});

// update the products
exports.updateProduct = catchAsyncerror(async (req, res ,next) => {
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
});

// delet the product
exports.deletProduct = catchAsyncerror(async (req, res , next) => {
  const productId = req.params.id;

  const updatedProduct = await Product.findByIdAndDelete(productId);

  if (!updatedProduct) {
    return next(new ErrorHandler("product not font" , 404))
  }


    res.json({
      success: true,
      updatedProduct
    });
  

});

exports.detailProduct =catchAsyncerror( async (req, res,next) => {
  const productId = req.params.id;

  const updatedProduct = await Product.findById(productId);

  if (!updatedProduct) {
    return next(new ErrorHandler("product not found" , 404))
  } 
    res.json({
      success: true,
      updatedProduct
    });
  
});

