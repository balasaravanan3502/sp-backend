const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classes: { type: Array },
  gmail: { type: String },
});

module.exports = mongoose.model("Staff", staffSchema);
