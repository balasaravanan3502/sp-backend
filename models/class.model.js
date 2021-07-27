const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const classModel = {};

classModel.createClass = (classDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.CLASS)
    .then((model) => model.create(classDetails))
    .then((response) => response);
};

// userModel.getclassS = () => {
//   return collection
//     .getCollection(COLLECTION_NAME.classS)
//     .then((model) => model.find())
//     .then((response) => response);
// };

// userModel.getUserById = (userId) => {
//   return collection
//     .getCollection(COLLECTION_NAME.classS)
//     .then((model) => model.find({ _id: ObjectId(userId) }))
//     .then((response) => response);
// };

module.exports = classModel;
