const userModel = require("../models/user.model");
const { ApiError } = require("../objectCreator/objectCreator");

const bcrypt = require("bcryptjs");

const userService = {};

userService.createUser = (userDetails) => {
  try {
    return userModel
      .getUserByEmail(userDetails.email)
      .then((response) => {
        if (response === undefined) return true;
        throw new ApiError("User Already Exists", 409);
      })
      .then((canCreate) => {
        return userModel
          .createUser(userDetails)
          .then((response) => ({ message: `User Created`, code: 200 }));
      });
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

userService.loginUser = async (loginDetails) => {
  try {
    const userData = await userModel.getUserByEmail(loginDetails.email);
    if (!userData) throw 404;
    else {
      const isNotMatch = await bcrypt.compare(
        loginDetails.password,
        userData.password
      );

      if (!isNotMatch) throw 404;
      else {
        return { code: 200, message: "Login" };
      }
    }
  } catch (statusCd) {
    throw new ApiError("Invalid Email or Password", statusCd);
  }
};

module.exports = userService;
