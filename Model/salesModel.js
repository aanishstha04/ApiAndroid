const mongoose = require("mongoose");
const SCHEMA = mongoose.Schema;

const SALESSCHEMA = new SCHEMA({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
  },
  order: [
    {
      quantity: {
        type: Number,
        required: true,
      },

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        // required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
});

const SALES = mongoose.model("sales", SALESSCHEMA);
module.exports = SALES;
