const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: { type: String, required: true },
  createdBy: { type: Object, required: true },
  comments: { type: Array },
});

module.exports = mongoose.model("Question", questionSchema);
