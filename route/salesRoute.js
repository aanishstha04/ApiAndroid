const express = require("express");
const SalesController = require("../Controller/salesController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const APIROUTER = express.Router();

const sales = new SalesController();

// auth requests
APIROUTER.post("/insert", auth, sales.addSales);
APIROUTER.get("/showSales/", sales.showSales);
APIROUTER.get("/showSingle/:id", sales.showSingleSales);

module.exports = APIROUTER;
