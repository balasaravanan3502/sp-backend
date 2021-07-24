const express = require("express");

const usersService = require("../service/user.service");
const userRouter = express.Router();

userRouter.get("/users", (req, res, next) => {
  usersService
    .getUsers()
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

userRouter.post("/users", (req, res, next) => {
  usersService
    .createUser(req.body)
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
