const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const questionModel = {};

questionModel.createQuestion = (questionDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.QUESTION)
    .then((model) => model.create(questionDetails))
    .then((response) => response);
};

module.exports = questionModel;
