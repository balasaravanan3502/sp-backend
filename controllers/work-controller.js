const HttpError = require("../models/http.error");
const Work = require("../models/work.model");

const createWork = async (req, res, next) => {
  let workDetails = req.body;

  let findclass = await Class.findOne({
    name: workDetails.class,
  });

  try {
    const DBWorkdetails = Work(workDetails);
    console.log(DBWorkdetails);
    DBWorkdetails.unCompleted = findclass.students;
    await DBWorkdetails.save();
  } catch {
    return new HttpError("Error Occured", 500);
  }

  return res.status(201).json({
    code: "200",
    role: "student",
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

exports.createWork = createWork;

exports.workComplete = workComplete;
