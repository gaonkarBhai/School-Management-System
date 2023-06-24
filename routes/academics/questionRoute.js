const questionRouter = require("express").Router();
const {
  createQuestion,
  getAllQuestions,
  getSingleQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../../controllers/academics/questionController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");
// express route chaining
questionRouter.get("/", isTeacherLogin, isTeacher, getAllQuestions);
questionRouter
  .route("/:questionID")
  .get(isTeacherLogin, isTeacher, getSingleQuestion)
  .delete(isTeacherLogin, isTeacher, deleteQuestion)
  .put(isTeacherLogin, isTeacher, updateQuestion);
questionRouter
  .route("/:examID")
  .post(isTeacherLogin, isTeacher, createQuestion);

module.exports = questionRouter;
