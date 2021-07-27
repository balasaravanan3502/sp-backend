const express = require("express");
const staffModel = require("../models/staff.model");
const staffService = require("../service/staff.service");

const staffRouter = express.Router();

staffRouter.post("/create-staff", (req, res, next) => {
  staffService
    .createStaff(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = staffRouter;
