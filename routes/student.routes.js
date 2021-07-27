const express = require("express");

const studentController = require("../controllers/student-controller");
const studentRouter = express.Router();

studentRouter.post("/create-student", studentController.createStudent);

studentRouter.post("/login", (req, res, next) => {
  studentsService
    .loginStudent(req.body)
    .then((response) => res.send(response))
    .catch((error) => next(error));
});

// studentRouter.get("/students/", (req, res, next) => {
//   studentsService
//     .getstudentById(req.query.id)
//     .then((response) => res.send(response))
//     .catch((error) => next(error));
// });

// studentRouter.delete("/students/", (req, res, next) => {
//   studentsService
//     .deletestudentById(req.query.id)
//     .then((response) => res.send(response))
//     .catch((error) => next(error));
// });

module.exports = studentRouter;
