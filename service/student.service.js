const studentModel = require("../models/student.model");
const { ApiError } = require("../objectCreator/objectCreator");

const bcrypt = require("bcryptjs");

const studentService = {};

studentService.createStudent = (studentDetails) => {
  try {
    return studentModel
      .getStudentByEmail(studentDetails.email)
      .then((response) => {
        if (response === undefined) return true;
        throw new ApiError("Student Already Exists", 409);
      })
      .then((canCreate) => {
        return studentModel
          .createStudent(studentDetails)
          .then((response) => ({ message: `Student Created`, code: 200 }));
      });
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

studentService.loginStudent = async (loginDetails) => {
  try {
    const studentData = await studentModel.getStudentByEmail(
      loginDetails.email
    );
    if (!studentData) throw 404;
    else {
      const isNotMatch = await bcrypt.compare(
        loginDetails.password,
        studentData.password
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

module.exports = studentService;
