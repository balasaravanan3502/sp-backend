const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorLogger = require("./utils/errorLogger.js");
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

app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
