const Student = require("../models/student.model");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");

const createStudent = async (req, res, next) => {
  let studentDetails = req.body;
  let isNewStudent;
  try {
    isNewStudent = await Student.findOne({ email: studentDetails.email });
  } catch {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (isNewStudent) {
    const error = new HttpError(
      "User exists already, please login instead.",
      500
    );
    return next(error);
  }

  try {
    const salt = await bcrypt.genSalt(10);
    studentDetails.password = await bcrypt.hash(studentDetails.password, salt);
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  const createdStudent = Student(studentDetails);

  try {
    await createdStudent.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    userId: createdStudent.id,
    email: createdStudent.email,
    role: "student",
  });
};

exports.createStudent = createStudent;
