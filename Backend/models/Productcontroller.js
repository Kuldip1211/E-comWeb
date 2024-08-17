const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  image: {
    type: {
      imageId: {
        type: String,
      
      },
      imageUrl: {
        type: String,
     
      },
    },
  },
  stocks: {
    type: Number,
    required: true,
  },
  reviews: [
    {
      name: {
        type: String,
      },

      comment: {
        type: String,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
