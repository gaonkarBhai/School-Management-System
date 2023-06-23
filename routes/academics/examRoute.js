const examRouter = require("express").Router();
const {
  createExam,
  getAllExams,
  getSingleExam,
  updateExam,
  deleteExam,
} = require("../../controllers/academics/examController");
const isTeacher = require("../../middlewares/isTeacher");
const isTeacherLogin = require("../../middlewares/isTeacherLogin");

// express route chaining
examRouter
  .route("/")
  .post(isTeacherLogin, isTeacher, createExam)
  .get(isTeacherLogin, isTeacher, getAllExams);
examRouter
  .route("/:examID")
  .get(isTeacherLogin, isTeacher, getSingleExam)
  .put(isTeacherLogin, isTeacher, updateExam)
  .delete(isTeacherLogin, isTeacher, deleteExam);
module.exports = examRouter;
