const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workSchema = new Schema({
  staffName: { type: String, required: true },
  question: { type: Array, required: true },
  unCompleted: { type: Array },
  completed: {
    type: Array,
  },
  question: {
    type: Array,
  },
  lastDate: { type: String, required: true },
  class: { type: String, required: true },
});

module.exports = mongoose.model("Work", workSchema);
