const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth-controller");

authRouter.post("/login", authController.loginUser);

authRouter.post("/link-google", authController.linkWithGoogle);

authRouter.post("/login-google", authController.loginWithGoogle);

module.exports = authRouter;
