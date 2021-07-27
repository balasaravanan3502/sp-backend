const express = require("express");
const staffController = require("../controllers/staff-controller");

const staffRouter = express.Router();

staffRouter.post("create-staff", staffController.createStaff);

module.exports = staffRouter;
