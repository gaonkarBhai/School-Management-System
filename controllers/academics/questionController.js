const AsyncHandler = require("express-async-handler");
const Exam = require("../../models/academic/Exam");
const Question = require("../../models/academic/Question");

//Teacher Create Question | POST
const createQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy,
  } = req.body;
  const examFound = await Exam.findById(req.params.examID);
  if (!examFound) {
    throw new Error("Exam not found");
  }
  const questionExists = await Question.findOne({ question });
  if (questionExists) {
    throw new Error("Question already Exists");
  }
  const newQuestion = await Question.create({
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy: req.userAuth.id,
  });
  examFound.questions.push(newQuestion?._id);
  await examFound.save();
  res.status(201).json({
    status: "success",
    message: "New Question created successfully",
    data: newQuestion,
  });
});

//Teacher Get All Question | GET
const getAllQuestions = AsyncHandler(async (req, res) => {
  const question = await Question.find({});
  res.status(201).json({
    status: "success",
    message: "all questions fetched successfully",
    data: question,
  });
});

//Teacher Get Question | GET
const getSingleQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionID);
  res.status(201).json({
    status: "success",
    message: "Question fetched successfully",
    data: question,
  });
});

//Teacher update Question | PUT
const updateQuestion = AsyncHandler(async (req, res) => {
  const {
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
    createdBy,
  } = req.body;
  const questionExists = await Question.findOne({ question });
  if (questionExists) {
    throw new Error("Question already exists");
  }
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.questionID,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth.id,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "Question updated successfully",
    data: updatedQuestion,
  });
});

//Teacher Delete Question | Delete
const deleteQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.questionID);
  res.status(200).json({
    status: "success",
    message: "Question deleted successfully",
  });
});

module.exports = {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
};
