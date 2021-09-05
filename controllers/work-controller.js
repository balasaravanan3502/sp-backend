const HttpError = require("../models/http.error");
const Work = require("../models/work.model");
const Class = require("../models/class.model");

const createWork = async (req, res, next) => {
  let workDetails = req.body;
  let findclass = await Class.findOne({
    name: workDetails.class,
  });

  if (!findclass) {
    const error = new HttpError(
      "Class not found, Please try again later.",
      500
    );
    return next(error);
  }
  let DBWorkdetails;

  try {
    DBWorkdetails = Work(workDetails);
    DBWorkdetails.unCompleted = findclass.students;

    await DBWorkdetails.save();
  } catch {
    return new HttpError("Error Occured", 500);
  }
  return res.status(201).json({
    code: "200",
    id: DBWorkdetails._id,
  });
};

const workComplete = async (req, res, next) => {
  let completedDetails = req.body;

  let workID = completedDetails.workID;
  let studentID = completedDetails.studentID;
  let studentName = completedDetails.studentName;
  let Question = completedDetails.question;
  let Answer = completedDetails.answer;

  let findWorkid;
  try {
    findWorkid = await Work.findOne({
      _id: workID,
    });
  } catch (err) {
    const error = new HttpError("Work not found", 400);
    return next(error);
  }

  try {
    findWorkid.completed.push({
      studentId: studentID,
      studentName: studentName,
      question: Question,
      answer: Answer,
    });
  } catch {
    const error = new HttpError("Work not found", 400);
    return next(error);
  }

  const saveCompleted = Work(findWorkid);
  await saveCompleted.save();

  return res.status(200).json({
    code: 200,
    studentId: saveCompleted.completed,
  });
};

const getWorks = async (req, res, next) => {
  const userDetails = req.body;
  let works;
  if (userDetails.role === "staff") {
    try {
      works = await Work.find({
        creatorId: userDetails.id,
      });
    } catch {
      const error = new HttpError("Staff Name not found", 400);
      return next(error);
    }
    return res.status(200).json({
      code: 200,
      data: works,
    });
  }

  try {
    works = await Work.find({
      class: userDetails.class,
    });

    works.forEach((work) => {
      let completed = [];
      let unCompleted = [];
      work.completed.forEach((doc) => completed.push(doc.name));
      work.unCompleted.forEach((doc) => unCompleted.push(doc.name));

      work.completed = completed;
      work.unCompleted = unCompleted;
      console.log(work);
      return work;
    });
  } catch {
    const error = new HttpError("Please try again later", 400);
    return next(error);
  }
  return res.status(200).json({
    code: 200,
    data: works,
  });
};

exports.createWork = createWork;

exports.workComplete = workComplete;

exports.getWorks = getWorks;
