const express = require("express");
const materialRouter = express.Router();

const materialController = require("../controllers/material-controller");

materialRouter.post("/add-material", materialController.addMaterial);

module.exports = materialRouter;
