const express = require("express");
const classRouter = express.Router();

const classService = require("../service/class.service");

classRouter.post("/create-class", (req, res, next) => {
  classService
    .createClass(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = classRouter;
