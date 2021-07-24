const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const errorLogger = require("./utils/errorLogger");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(cors());

app.use(userRoutes);

app.use(errorLogger);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
