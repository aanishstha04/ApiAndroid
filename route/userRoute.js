const express = require("express");
const SignUpController = require("../Controller/signUpController");
const SignInController = require("../Controller/signInController");
const checkAuth = require("../middleware/auth");
const UserController = require("../Controller/userController");

const APIROUTER = express.Router();

// auth requests
APIROUTER.post("/register", SignUpController.registerUser);
APIROUTER.post("/login", SignInController.signIn);
APIROUTER.get("/current", checkAuth, UserController.getCurrentUser);
APIROUTER.put("/update/:id", checkAuth, UserController.updateUser);
APIROUTER.delete("/delete/:id", checkAuth, UserController.deleteUser);
APIROUTER.get("/showuser", UserController.showUser);

module.exports = APIROUTER;
