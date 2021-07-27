const staffModel = require("../models/staff.model");
const { ApiError } = require("../objectCreator/objectCreator");

const staffService = {};

staffService.createStaff = (staffDetails) => {
  try {
    return staffModel
      .createStaff(staffDetails)
      .then((response) => ({ message: `Staff Created`, code: 200 }));
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

module.exports = staffService;
