const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const staffRoutes = require("./routes/staff.routes");
const questionRoutes = require("./routes/question.routes");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/class", classRoutes);

app.use("/student", studentRoutes);

app.use("/staff", staffRoutes);

app.use("/question", questionRoutes);

mongoose
  .connect(
    `mongodb+srv://vpbs:spdatabase123@cluster0.fddbp.mongodb.net/sp-database?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
