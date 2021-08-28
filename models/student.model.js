const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  regNo: { type: String, required: true },
  password: { type: String, required: true },
  className: { type: String, required: true },
  classId: { type: String },
  gmail: { type: String },
  phone: { type: String },
});

module.exports = mongoose.model("Student", studentSchema);
