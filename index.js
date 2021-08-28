const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");
const staffRoutes = require("./routes/staff.routes");
const questionRoutes = require("./routes/question.routes");
const workRoutes = require("./routes/work.routes");
const materialRoutes = require("./routes/material.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/class", classRoutes);

app.use("/student", studentRoutes);

app.use("/staff", staffRoutes);

app.use("/work", workRoutes);

app.use("/question", questionRoutes);

app.use("/material", materialRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fddbp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
