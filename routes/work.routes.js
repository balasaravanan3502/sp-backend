const express = require("express");
const workController = require("../controllers/work-controller");

const workRouter = express.Router();

workRouter.post("/create-work", workController.createWork);

workRouter.post("/complete-work", workController.workComplete);

workRouter.post("/get-works", workController.getWorks);

module.exports = workRouter;
