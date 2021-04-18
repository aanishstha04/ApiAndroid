const express = require("express");
const ProductController = require("../Controller/productController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/imageUpload");

const APIROUTER = express.Router();

const Product = new ProductController();

// auth requests
APIROUTER.post(
  "/insert",
  auth,
  isAdmin,
  upload.single("productImage"),
  Product.addProduct
);
APIROUTER.put("/update/:_id", auth, isAdmin, Product.updateProduct);
APIROUTER.put("/upload/:id", auth, isAdmin, Product.uploadDisplayPicture);
APIROUTER.delete("/delete/:id", auth, isAdmin, Product.deleteProduct);
APIROUTER.get("/showproduct", Product.showProduct);
APIROUTER.get("/showSingle/:id", Product.showSingleProduct);

module.exports = APIROUTER;
