const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorLogger = require("./utils/errorLogger.js");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/class", classRoutes);
app.use((req, res, next) => {
  console.log("asdasdd");
  next();
});

app.use("/student", studentRoutes);

app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
