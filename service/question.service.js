const questionModel = require("../models/question.model");
const { ApiError } = require("../objectCreator/objectCreator");

const questionService = {};

questionService.createQuestion = (questionDetails) => {
  try {
    return questionModel
      .createQuestion(questionDetails)
      .then((response) => ({ message: `Question Created`, code: 200 }));
  } catch (statusCd) {
    throw new ApiError("Unknown error", statusCd);
  }
};

module.exports = questionService;
