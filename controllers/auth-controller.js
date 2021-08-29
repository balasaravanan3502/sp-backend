const bcrypt = require("bcryptjs");

const Student = require("../models/student.model");
const Staff = require("../models/staff.model");

const HttpError = require("../models/http.error");

const loginUser = async (req, res, next) => {
  let userDetails = req.body;
  let role;
  let user;
  try {
    user = await Student.findOne({ email: userDetails.email });
    role = "student";
  } catch {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }
  if (!user)
    try {
      user = await Staff.findOne({ email: userDetails.email });
      role = "staff";
    } catch {
      const error = new HttpError("Login failed, please try again later.", 500);
      return next(error);
    }

  if (!user) {
    const error = new HttpError("User does not exists already", 500);
    return next(error);
  }

  let result;
  try {
    console.log("asd");
    result = await bcrypt.compare(userDetails.password, user.password);
  } catch {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  if (result) {
    res.status(200).json({
      code: "200",
      email: user.email,
      role,
    });
  } else {
    const error = new HttpError("Invalid Email or password.", 500);
    return next(error);
  }
};

exports.loginUser = loginUser;
