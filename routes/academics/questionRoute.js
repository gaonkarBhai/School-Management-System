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
const Teacher = require("../../models/staff/Teacher");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");
// express route chaining
questionRouter.get("/", isAuthenicated(Teacher), isTeacher, getAllQuestions);
questionRouter
  .route("/:questionID")
  .get(isAuthenicated(Teacher), isTeacher, getSingleQuestion)
  .delete(isAuthenicated(Teacher), isTeacher, deleteQuestion)
  .put(isAuthenicated(Teacher), isTeacher, updateQuestion);
questionRouter
  .route("/:examID")
  .post(isAuthenicated(Teacher), isTeacher, createQuestion);

module.exports = questionRouter;
