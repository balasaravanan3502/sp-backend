const bcrypt = require("bcrypt");
var crypto = require("crypto");

const collection = require("./DB/connection");
const { COLLECTION_NAME } = require("../keys/constant");

const studentModel = {};

studentModel.createStudent = (studentDetails) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => {
      bcrypt.hash(studentDetails.password, 10).then((hash) => {
        studentDetails.password = hash;
        studentDetails.token = crypto.randomBytes(36).toString("hex");
        model.create(studentDetails);
      });
    })
    .then((response) => response);
};

studentModel.getStudentByEmail = (studentEmail) => {
  return collection
    .getCollection(COLLECTION_NAME.STUDENTS)
    .then((model) => model.find({ email: studentEmail }))
    .then((response) => response[0]);
};

// userModel.getSTUDENTS = () => {
//   return collection
//     .getCollection(COLLECTION_NAME.STUDENTS)
//     .then((model) => model.find())
//     .then((response) => response);
// };

// userModel.getUserById = (userId) => {
//   return collection
//     .getCollection(COLLECTION_NAME.STUDENTS)
//     .then((model) => model.find({ _id: ObjectId(userId) }))
//     .then((response) => response);
// };

// userModel.deleteUserById = (userId) => {
//   return collection
//     .getCollection(COLLECTION_NAME.STUDENTS)
//     .then((model) => model.deleteOne({ _id: ObjectId(userId) }))
//     .then((response) => response);
// };

module.exports = studentModel;
