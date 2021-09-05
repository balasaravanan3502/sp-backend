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

  if (user === null) {
    return res.status(500).json({
      code: "500",
      message: "User not found",
    });
  }

  let result;
  try {
    result = await bcrypt.compare(userDetails.password, user.password);
  } catch {
    const error = new HttpError("Login failed, please try again later.", 500);
    return next(error);
  }

  if (result) {
    res.status(200).json({
      code: "200",
      id: user._id,
      name: user.name,
      role,
    });
  } else {
    const error = new HttpError("Invalid password.", 500);
    return next(error);
  }
};

const linkWithGoogle = async (req, res, next) => {
  const { email, gmail } = req.body;
  let user;
  try {
    user = await Student.findOne({ email: email });
  } catch {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  if (!user)
    try {
      user = await Staff.findOne({ email: email });
    } catch {
      const error = new HttpError("Please try again later.", 500);
      return next(error);
    }
  console.log(user);
  try {
    user.gmail = gmail;
    user.save();
  } catch {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  res.status(200).json({
    code: "200",
    message: "Gmail has been successfully linked",
  });
};

const loginWithGoogle = async (req, res) => {
  const { gmail } = req.body;
  let user;
  let role;
  try {
    user = await Student.findOne({ gmail });
    role = "student";
  } catch {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  if (!user)
    try {
      user = await Staff.findOne({ gmail });
      role = "staff";
    } catch {
      const error = new HttpError("Please try again later.", 500);
      return next(error);
    }
  console.log(user);
  if (user)
    return res.status(200).json({
      code: "200",
      email: user.email,
      id: user._id,
      role,
    });
  res.status(500).json({
    code: "500",
    message: "No Gmail has been associated",
  });
};

exports.loginUser = loginUser;

exports.linkWithGoogle = linkWithGoogle;

exports.loginWithGoogle = loginWithGoogle;
