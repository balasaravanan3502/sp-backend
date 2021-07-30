const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workSchema = new Schema({
  staffName: { type: String, required: true },
  type: { type: String, required: true },
  completed: { type: Array },
  unCompleted: { type: Array },
  lastDate: { type: String, required: true },
});

module.exports = mongoose.model("Work", workSchema);
