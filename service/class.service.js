const classModel = require("../models/class.model");
const { ApiError } = require("../objectCreator/objectCreator");

const classService = {};

classService.createClass = (classDetails) => {
  try {
    return classModel
      .createClass(classDetails)
      .then((response) => ({ message: `Class Created`, code: 200 }));
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

module.exports = classService;
