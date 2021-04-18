module.exports = isAdmin = async (req, res, next) => {
  try {
    if (req.authUser.userType == "Admin") {
      next();
    } else {
      res.status(401).json({
        success: false,
        error: "You do not have sufficient privilege",
      });
    }
  } catch (e) {
    res.statue(500).json({
      success: false,
      error: e.message,
    });
  }
};
