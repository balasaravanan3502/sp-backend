const express = require("express");
const workController = require("../controllers/work-controller");

const workRouter = express.Router();

workRouter.post("/create-work", workController.createWork);

workRouter.post("/create-complete", workController.workComplete);

module.exports = workRouter;
