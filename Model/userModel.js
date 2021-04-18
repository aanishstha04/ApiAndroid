const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SCHEMA = mongoose.Schema;
const jwt = require("jsonwebtoken");

const USERSCHEMA = new SCHEMA({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Select your Gender"],
    trim: true,
  },
  mobileNumber: {
    type: Number,
    required: [true, "Mobile Number is required"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email-address is required"],
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  userType: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  userImage: {
    type: String,
    default: "user.png",
  },
  authTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// mongoose "pre" hook to hash the password of every new user
USERSCHEMA.pre("save", async function (next) {
  if (!this.isNew || !this.isModified) {
    next();
  } else {
    try {
      // hash the plain text password
      let hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
      // set the hashed password to be the password of the new user
      this.password = hashedPassword;
      // execute next code
      next();
    } catch (error) {
      next(error);
      console.log(error.message);
    }
  }
});

//check if email exists already
USERSCHEMA.statics.emailExists = async function (email) {
  let emailExists = await USER.findOne({ email: email });
  return emailExists;
};

//check if username exists already
USERSCHEMA.statics.usernameExists = async function (username) {
  let usernameExists = await USER.findOne({ username: username });
  return usernameExists;
};

// compare login password with the actual password
USERSCHEMA.methods.comparePassword = async function (plainPassword) {
  let matched = await bcrypt.compare(plainPassword, this.password);
  return matched;
};

//Generate Token
USERSCHEMA.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ id: this._id }, "secretkey");
  this.authTokens = await this.authTokens.concat({ token });
  await this.save();
  return token;
};

// hide some attributes of user model while sending json response
USERSCHEMA.methods.toJSON = function () {
  let user = this.toObject();
  delete user.password;
  delete user.authTokens;
  delete user.createdAt;
  delete user.__v;
  return user;
};

const USER = mongoose.model("user", USERSCHEMA);
module.exports = USER;
