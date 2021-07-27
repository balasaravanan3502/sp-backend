const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const staffModel = {};

staffModel.createStaff = (staffDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.STAFF)
    .then((model) => model.create(staffDetails))
    .then((response) => response);
};

// userModel.getstaffS = () => {
//   return collection
//     .getCollection(COLLECTION_NAME.staffS)
//     .then((model) => model.find())
//     .then((response) => response);
// };

// userModel.getUserById = (userId) => {
//   return collection
//     .getCollection(COLLECTION_NAME.staffS)
//     .then((model) => model.find({ _id: ObjectId(userId) }))
//     .then((response) => response);
// };

module.exports = staffModel;
