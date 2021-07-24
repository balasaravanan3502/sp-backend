const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const userModel = {};

userModel.createUser = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => {
      model.create(userDetails);
    })
    .then((response) => response);
};

userModel.getUsers = () => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.find())
    .then((response) => response);
};

userModel.getUserById = (userId) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.find({ _id: ObjectId(userId) }))
    .then((response) => response);
};

userModel.deleteUserById = (userId) => {
  return collection
    .getCollection(COLLECTION_NAME.USERS)
    .then((model) => model.deleteOne({ _id: ObjectId(userId) }))
    .then((response) => response);
};

module.exports = userModel;
