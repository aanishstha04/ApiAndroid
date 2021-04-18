const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");

module.exports = checkAuth = async (request, response, next) => {
  console.log(request.headers)
  try {
    const token = await request.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, "secretkey");
    const authUser = await User.findOne({
      _id: decoded.id,
      "authTokens.token": token,
    });
    if (!authUser) {
      response.status(404).json({ success: false, error: "User not found !" });
    } else {
      request.token = token;
      request.authUser = authUser;
      next();
    }
  } catch (error) {
    console.log("auth.js", error);
    response
      .status(401)
      .json({ success: false, error: "Unauthorized. Token Missing !" });
  }
};
