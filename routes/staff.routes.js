const express = require("express");
const staffController = require("../controllers/staff-controller");

const staffRouter = express.Router();

staffRouter.post("/create-staff", staffController.createStaff);

staffRouter.post("/join-class", staffController.staffJoinClass);

staffRouter.post("/staff-login", staffController.loginStaff);

module.exports = staffRouter;
