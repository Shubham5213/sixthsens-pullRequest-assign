const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authMiddle = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Please Login to access this resource");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
  } catch (e) {
    return res.status(401).json({ msg: e.message });
  }
};

exports.authorizeRoles = (...roles) => {
  return async (req, res, next) => {
    let user = req.user;
    user = await user.populate("roles");

    // let isAdmin = function (obj) {
    //   return obj.roleName === "admin";
    // };
    userRoles = [];
    user.roles.forEach((role) => {
      userRoles.push(role.roleName);
    });
    let isValid = false;
    user.roles.forEach((role) => {
      isValid= isValid || roles.includes(role.roleName);
    });
    if (!isValid) {
      throw new Error(
        `Role: + ${req.user.role} + is not allowed to access this resource`
      );
    }
    next();
  };
};
