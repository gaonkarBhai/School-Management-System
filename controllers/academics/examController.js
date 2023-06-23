const AsyncHandler = require("express-async-handler");
const Teacher = require("../../models/staff/Teacher");
const Exam = require("../../models/academic/Exam");

const createExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    duration,
    examDate,
    examTime,
    examType,
    classLevel,
    subject,
    program,
    academicTerm,
    academicYear,
    createdBy,
    examStatus,
  } = req.body;
  const teacherFound = await Teacher.findById(req.userAuth?.id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  const examExists = await Exam.find({ name });
  if (!examExists) {
    throw new Error("Exam already Exists");
  }
  const newExam = await Exam.create({
    name,
    description,
    duration,
    examDate,
    examTime,
    examType,
    classLevel,
    createdBy: req.userAuth?.id,
    subject,
    program,
    academicTerm,
    academicYear,
    examStatus,
  });
  teacherFound.examCreated.push(newExam.id);
  await teacherFound.save();
  res.status(201).json({
    status: "success",
    message: "Exam created successfully",
    data: newExam,
  });
});

const getAllExams = AsyncHandler(async (req, res) => {
  const exams = await Exam.find({});
  res.status(201).json({
    status: "success",
    message: "Exams fetched successfully",
    data: exams,
  });
});
const getSingleExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.examID);
  res.status(201).json({
    status: "success",
    message: "Exam fetched successfully",
    data: exam,
  });
});
const updateExam = AsyncHandler(async (req, res) => {
  const {
    name,
    description,
    duration,
    examDate,
    examTime,
    examType,
    classLevel,
    subject,
    program,
    academicTerm,
    academicYear,
    createdBy,
    examStatus,
  } = req.body;
  const examFound = await Exam.findOne({ name });
  if (examFound) {
    throw new Error("Exam already exists");
  }
  const exam = await Exam.findByIdAndUpdate(
    req.params.examID,
    {
      name,
      description,
      duration,
      examDate,
      examTime,
      examType,
      classLevel,
      createdBy: req.userAuth?.id,
      subject,
      program,
      academicTerm,
      academicYear,
      examStatus,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Exam updated successfully",
    data: exam,
  });
});
const deleteExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findByIdAndDelete(req.params.examID);
  res.status(201).json({
    status: "success",
    message: "Exam deleted successfully"
  });
});
module.exports = {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
};
