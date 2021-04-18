const User = require("../Model/userModel");
const Validation = require("../Validation/userValidation");

class SignInController {
  //sign the user in to the application
  async signIn(req, res) {
    console.log(req.body);
    const result = Validation.SIGNIN(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(201).json({
        success: false,
        errors: result.error,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      try {
        let user = await User.findOne({ username: result.value.username });
        if (!user) {
          res.status(201).json({
            success: false,
            error: { field: "username", message: "User does not exist!" },
          });
        } else {
          if (await user.comparePassword(result.value.password)) {
            const authToken = await user.generateAuthToken();
            console.log(authToken);
            res
              .status(200)
              .json({ success: true, data: user, token: authToken, userType:user.userType });
          } else {
            res.status(201).json({
              success: false,
              error: {
                field: "username",
                message: "Invalid login. Try again!",
              },
            });
          }
        }
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  }
}

const signInController = new SignInController();
module.exports = signInController;
