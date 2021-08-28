const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workSchema = new Schema({
  creatorName: { type: String, required: true },
  creatorId: { type: String, required: true },
  question: { type: Array, required: true },
  title: { type: Array, required: true },
  unCompleted: { type: Array },
  completed: {
    type: Array,
  },
  lastDate: { type: String, required: true },
  class: { type: String, required: true },
});

module.exports = mongoose.model("Work", workSchema);
