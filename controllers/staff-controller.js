const Staff = require("../models/staff.model");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");

const createStaff = async (req, res, next) => {
  let staffDetails = req.body;
  let isNewStaff;
  try {
    isNewStaff = await Staff.findOne({ email: staffDetails.email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (isNewStaff) {
    const error = new HttpError(
      "User exists already, please login instead.",
      500
    );
    return next(error);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    staffDetails.password = await bcrypt.hash(staffDetails.password, salt);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  const createdStaff = Staff(staffDetails);

  try {
    await createdStaff.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userId: createdStaff.id,
    email: createdStaff.email,
    role: "staff",
  });
};

exports.createStaff = createStaff;
