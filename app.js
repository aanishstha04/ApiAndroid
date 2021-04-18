const express = require("express");
const db = require("./config/dbConfig");
const userRouter = require("./route/userRoute");
const productRouter = require("./route/productRoute");
const cors = require("cors");
const cartRouter = require("./route/cartRoute");
const salesRouter = require("./route/salesRoute");
var app = express();

app.use(cors());

// app.use(express.static("./public"));
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);;
app.use("/api/cart", cartRouter);
app.use("/api/sales", salesRouter);
const PORT = 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
