const { number } = require("@hapi/joi");
const mongoose = require("mongoose");
const CartController = require("../Controller/cartController");
const SCHEMA = mongoose.Schema;

const CARTSCHEMA = new SCHEMA({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  total: {
    type: Number,
  },
 
});
const CART = mongoose.model("addtocart", CARTSCHEMA);
module.exports = CART;
