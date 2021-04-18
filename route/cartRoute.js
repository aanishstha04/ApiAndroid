const express = require("express");
const CartController = require("../Controller/cartController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const APIROUTER = express.Router();

const cart = new CartController();

// auth requests
APIROUTER.post("/insert/", auth, cart.addCart);
APIROUTER.delete("/delete/:id", auth, cart.deleteCart);
APIROUTER.get("/showCart", auth, cart.showCart);
APIROUTER.post("/insert/", auth, cart.addAndroidCart);

APIROUTER.put("/update/:id", auth, cart.updateCart);

module.exports = APIROUTER;
