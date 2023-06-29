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
const Teacher = require("../../models/staff/Teacher");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

// express route chaining
examRouter
  .route("/")
  .post(isAuthenicated(Teacher), isTeacher, createExam)
  .get(isAuthenicated(Teacher), isTeacher, getAllExams);
examRouter
  .route("/:examID")
  .get(isAuthenicated(Teacher), isTeacher, getSingleExam)
  .put(isAuthenicated(Teacher), isTeacher, updateExam)
  .delete(isAuthenicated(Teacher), isTeacher, deleteExam);
module.exports = examRouter;
