const Class = require("../models/class.model");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");

const createClass = async (req, res, next) => {
  let classDetails = req.body;
  let isNewClass;
  try {
    isNewClass = await Class.findOne({ email: classDetails.email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (isNewClass) {
    const error = new HttpError(
      "User exists already, please login instead.",
      500
    );
    return next(error);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    classDetails.password = await bcrypt.hash(classDetails.password, salt);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  const createdClass = Class(classDetails);

  try {
    await createdClass.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userId: createdClass.id,
    email: createdClass.email,
    role: "class",
  });
};

exports.createClass = createClass;
