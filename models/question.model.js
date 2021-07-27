const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  name: { type: String, required: true },
  students: { type: Array },
  staff: { type: Array },
  works: { type: Array },
});

module.exports = mongoose.model("Question", questionSchema);
