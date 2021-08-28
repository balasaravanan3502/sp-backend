const Student = require("../models/student.model");
const Class = require("../models/class.model");
const HttpError = require("../models/http.error");

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
  let studentClass;
  try {
    studentClass = await Class.findOne({ name: studentDetails.className });
    studentClass.students.push({
      id: createdStudent.id,
      name: studentDetails.name,
    });
    console.log("asd");
    await studentClass.save();
    createdStudent.classId = studentClass.id;
    await createdStudent.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }
  res.status(201).json({
    code: "200",
    userId: createdStudent.id,
    email: createdStudent.email,
    role: "student",
  });
};

const loginStudent = async (req, res, next) => {
  let studentDetails = req.body;
  let student;
  try {
    student = await Student.findOne({ email: studentDetails.email });
  } catch {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  if (!student) {
    const error = new HttpError(
      "User exists already, please login instead.",
      500
    );
    return next(error);
  }
  let result;
  try {
    result = await bcrypt.compare(studentDetails.password, student.password);
  } catch {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  if (result) {
    res.status(200).json({
      code: "200",
      email: student.email,
      role: "student",
    });
  } else {
    const error = new HttpError("Invalid Email or password.", 500);
    return next(error);
  }
};

exports.createStudent = createStudent;

exports.loginStudent = loginStudent;
