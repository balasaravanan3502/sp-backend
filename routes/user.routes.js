const express = require("express");

const usersService = require("../service/user.service");
const userRouter = express.Router();

userRouter.post("/signUp", (req, res, next) => {
  usersService
    .createUser(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

userRouter.post("/login", (req, res, next) => {
  usersService
    .loginUser(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

userRouter.get("/users/", (req, res, next) => {
  usersService
    .getUserById(req.query.id)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

userRouter.delete("/users/", (req, res, next) => {
  usersService
    .deleteUserById(req.query.id)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

module.exports = userRouter;
