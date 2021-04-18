const mongoose = require("mongoose");

const SCHEMA = mongoose.Schema;

const PRODUCTSCHEMA = new SCHEMA({
  productName: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  productPrice: {
    type: Number,
    required: [true, "Product price is required"],
    trim: true,
  },
  productDescription: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    enum: ["comot", "tap", "shower"],
  },
  productImage: {
    type: String,
    default: "noimage.jpg",
    trim: true,
  }
});

const PRODUCT = mongoose.model("product", PRODUCTSCHEMA);
module.exports = PRODUCT;
