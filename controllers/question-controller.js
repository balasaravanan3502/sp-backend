const Question = require("../models/question.model");

const createQuestion = async (req, res, next) => {
  let details = req.body;
  let newQuestion;

  try {
    // newQuestion = await Question.findOne({ question: details.toLowerCase() });
  } catch (err) {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  if (newQuestion) {
    const error = new HttpError("Question already exist.", 500);
    return next(error);
  }

  createdQuestion = Question(details);
  try {
    createdQuestion.save();
  } catch (err) {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }

  res.status(201).json({
    code: "200",
    questionId: createdQuestion.id,
  });
};

const addComment = async (req, res, next) => {
  questionDetails = req.body;
};

exports.createQuestion = createQuestion;
