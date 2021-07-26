const bcrypt = require("bcrypt");
var crypto = require("crypto");

const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const userModel = {};

userModel.createUser = (userDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => {
      bcrypt.hash(userDetails.password, 10).then((hash) => {
        userDetails.password = hash;
        userDetails.token = crypto.randomBytes(36).toString("hex");
        model.create(userDetails);
      });
    })
    .then((response) => response);
};

userModel.getUserByEmail = (userEmail) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => model.find({ email: userEmail }))
    .then((response) => response[0]);
};

userModel.getSTUDENTS = () => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => model.find())
    .then((response) => response);
};

userModel.getUserById = (userId) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => model.find({ _id: ObjectId(userId) }))
    .then((response) => response);
};

userModel.deleteUserById = (userId) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => model.deleteOne({ _id: ObjectId(userId) }))
    .then((response) => response);
};

module.exports = userModel;
