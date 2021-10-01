const HttpError = require("../models/http.error");
const Work = require("../models/work.model");
const Class = require("../models/class.model");
const nodemailer = require("nodemailer");
const Excel = require("exceljs");

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
  let answers = completedDetails.answers;

  let findWorkid;
  try {
    findWorkid = await Work.findOne({
      _id: workID,
    });
  } catch (err) {
    const error = new HttpError("Work not found", 400);
    return next(error);
  }
  let student;

  try {
    student = findWorkid.completed.filter((user) => user.id === studentID);
  } catch {
    const error = new HttpError("Error Try Later", 400);
    return next(error);
  }

  if (student[0]) {
    const error = new HttpError("Student already completed", 400);
    return next(error);
  }

  try {
    if (findWorkid.type === "quiz")
      findWorkid.completed.push({
        studentId: studentID,
        studentName: studentName,
        score: completedDetails.score,
      });
    else
      findWorkid.completed.push({
        studentId: studentID,
        studentName: studentName,
        answers: answers,
      });

    findWorkid.unCompleted = findWorkid.unCompleted.filter(
      (user) => user.id !== studentID
    );
  } catch {
    const error = new HttpError("Error Try Later", 400);
    return next(error);
  }

  await findWorkid.save();

  return res.status(200).json({
    code: "200",
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

  let data = [];

  try {
    works = await Work.find({
      class: userDetails.class,
    });

    works.forEach((work) => {
      let completed = [];
      let unCompleted = [];
      work.completed.forEach((doc) => completed.push(doc.studentId));
      work.unCompleted.forEach((doc) => unCompleted.push(doc.studentId));

      let isCompleted = completed.includes(req.body.id);
      let completedData = work.completed.filter(
        (doc) => doc.studentId === req.body.id
      );

      work.completed = completed;
      work.unCompleted = unCompleted;
      data.push({ ...work._doc, isCompleted, completedData: completedData[0] });
    });
  } catch {
    const error = new HttpError("Please try again later", 400);
    return next(error);
  }

  console.log(data);
  return res.status(200).json({
    code: 200,
    data: data,
  });
};

const sendMail = async (req, res, next) => {
  let id = req.body.workId;
  let work;

  try {
    work = await Work.findById(id);
  } catch {
    const error = new HttpError("Please try again later.", 500);
    return next(error);
  }
  let excelData = [];
  if (work.completed.length === 0) {
    return res.status(200).json({
      code: 200,
      response: "No data to send",
    });
  } else {
    console.log(work);

    let questions = work.questions.map((question, index) => {
      return { header: question.question, key: index + 1 };
    });
    questions.unshift({ header: "Name", key: 0 });

    let answers = [];
    work.completed.forEach((student) => {
      let studentAnswer = student.answers.map((answer, index) => {
        return { [index + 1]: answer.answer };
      });
      answers.push({ 0: "student.studentName", ...studentAnswer });
    });

    const filename = `${work.title}.xlsx`;
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet(work.title);

    worksheet.columns = questions;

    answers.forEach((e) => {
      worksheet.addRow(e);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "equizz123@gmail.com",
        pass: "QWER1234!12341",
      },
    });
    const mailOptions = {
      from: "equizz123@gmail.com",
      to: "balasaravananvp35@gmail.com",
      subject: "subject",
      html: "content",
      attachments: [
        {
          filename,
          content: buffer,
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    };
    await transporter.sendMail(mailOptions).then((res) => console.log(res));

    return res.status(200).json({
      code: 200,
      response: "Mail sent successfully",
    });
  }
};

exports.createWork = createWork;

exports.workComplete = workComplete;

exports.getWorks = getWorks;

exports.sendMail = sendMail;
