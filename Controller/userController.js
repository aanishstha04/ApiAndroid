const User = require("../Model/userModel");
const Validation = require("../Validation/userValidation");

class UserController {
  async getCurrentUser(request, response) {
    // let id = response.authUser.id;
    // let userId = request.params.id;
    let user = await User.findById({ _id: request.authUser.id });
    if (!user) {
      response
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    } else {
      response.status(200).json({ success: true, user: user });
    }
  }

  //update
  async updateUser(req, res) {
    
      try {
        // save the new user in db
        const userId = req.authUser._id;
        console.log(req.body)
       let data = {
         firstName : req.body.firstName,
         lastName  :req.body.lastName,
          email : req.body.email,
          address : req.body.address,
          mobileNumber : req.body.mobileNumber
       }
        let updateUser = await User.findOneAndUpdate(
          { _id: userId },
        {$set : data},
          { new: true }
        );
        res.status(201).json({
          success: true,
          message: "User updated successfully!",
          user: updateUser,
        });
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
      }
    
  }

  //displayAll User
  async showUser(req, res) {
    try {
      let user = await User.find();
      res.status(201).json({
        status: 201,
        success: true,
        message: "User displayed successfully!",
        users: user.reverse(),
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  //deleteProduct
  async deleteUser(req, res) {
    try {
      let id = req.params.id;
      let users = await User.findById({ _id: id });
      if (!users) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User Not Found",
        });
      }
      let user = await User.findByIdAndDelete({ _id: id });
      res.status(200).json({
        
        success: true,
        message: "User deleted successfully!",
        token: "",
        user: user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = new UserController();
