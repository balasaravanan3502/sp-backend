const userModel = require("../models/user.model");
const { ApiError } = require("../objectCreator/objectCreator");

const userService = {};

userService.createUser = (userDetails) => {
  try {
    return userModel
      .createUser(userDetails)
      .then((response) => ({ message: `User Created` }));
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

userService.getUsers = () => {
  try {
    return userModel.getUsers().then((response) => {
      return response;
    });
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

userService.getUserById = (userId) => {
  try {
    return userModel.getUserById(userId).then((response) => {
      return response;
    });
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

userService.deleteUserById = (userId) => {
  try {
    return userModel
      .deleteUserById(userId)
      .then((response) => ({ message: `Deleted Created` }));
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

module.exports = userService;
