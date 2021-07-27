const express = require("express");

const questionRouter = express.Router();

questionRouter.post("/create-question", (req, res, next) => {
  questionService
    .createQuestion(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = questionRouter;
