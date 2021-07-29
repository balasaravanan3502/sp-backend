const express = require("express");
const questionController = require("../controllers/question-controller");

const questionRouter = express.Router();

questionRouter.post("/create-question", questionController.createQuestion);

module.exports = questionRouter;
