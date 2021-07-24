const mongoose = require("mongoose");
const { COLLECTION_NAME } = require("../../keys/constant");

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const connection = {};

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const userObj = {
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
};

const usersSchema = new Schema(userObj, {
  collection: "Users",
  timestamps: true,
});

connection.getCollection = (collectionName) => {
  const DB_HOST = "mongodb://localhost:27017";
  return mongoose
    .connect(`${DB_HOST}/VeePrize`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      // eslint-disable-next-line default-case
      switch (collectionName) {
        case COLLECTION_NAME.USERS:
          return db.model(collectionName, usersSchema);
      }
    })
    .catch((err) => {
      let error = new Error("Could not connect to database");
      error.status = 500;
      throw error;
    });
};

module.exports = connection;
