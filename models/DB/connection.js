const mongoose = require("mongoose");
const { COLLECTION_NAME } = require("../../keys/constant");

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const connection = {};

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const studentObj = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  regNo: { type: String, required: true },
  password: { type: String, required: true },
};

const staffObj = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  classes: { type: Array },
};

const classObj = {
  name: { type: String, required: true },
  students: { type: Array },
  staff: { type: Array },
  works: { type: Array },
};

const studentsSchema = new Schema(studentObj, {
  collection: "Students",
});

const staffSchema = new Schema(staffObj, {
  collection: "Staff",
});

const classSchema = new Schema(classObj, {
  collection: "Class",
});

connection.getCollection = (collectionName) => {
  const DB_HOST = "mongodb://localhost:27017";
  return mongoose
    .connect(`${DB_HOST}/sp-server`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      // eslint-disable-next-line default-case
      switch (collectionName) {
        case COLLECTION_NAME.STUDENTS:
          return db.model(collectionName, studentsSchema);
        case COLLECTION_NAME.STAFF:
          return db.model(collectionName, staffSchema);
        case COLLECTION_NAME.CLASS:
          return db.model(collectionName, classSchema);
      }
    })
    .catch((err) => {
      let error = new Error("Could not connect to database");
      error.status = 500;
      throw error;
    });
};

module.exports = connection;
