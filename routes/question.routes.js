const express = require("express");
const questionModel = require("../models/question.model");
const questionService = require("../service/question.service");

const questionRouter = express.Router();

questionRouter.post("/create-question", (req, res, next) => {
  questionService
    .createQuestion(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = questionRouter;
