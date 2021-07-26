const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorLogger = require("./utils/errorLogger.js");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
