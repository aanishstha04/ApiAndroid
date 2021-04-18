const User = require("../Model/userModel");
const Validation = require("../Validation/userValidation");

class SignUpController {
  // create a new user and persist in database
  async registerUser(req, res) {
    // console.log('register',req.body);
    // delete req.body.id;
    const result = Validation.SIGNUP(req.body);
    if (result.error) {
      let error = result.error.details[0];
 

      res.status(422).json({
        success: false,
        error: {
          field: error.path[0],
          message: error.message,
        },
      });
    } else if (await User.emailExists(result.value.email)) {
      res.status(409).json({
        success: false,
        error: { field: "email", message: "Email already registered!" },
      });
    } else if (await User.usernameExists(result.value.username)) {
      res.status(409).json({
        success: false,
        error: { field: "username", message: "Username already registered!" },
      });
    } else {
      try {
        // save the new user in db

        delete result.value.user_id;

        let newUser = new User(result.value);
        let user = await newUser.save();
        res
          .status(201)
          .json({ success: true, message: "Sign up successful!", data: user });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }
}
const signUpController = new SignUpController();
module.exports = signUpController;
