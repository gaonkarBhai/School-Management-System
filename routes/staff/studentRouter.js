const studentRouter = require('express').Router()
const Student = require('../../models/academic/Student')
const Admin = require('../../models/staff/Admin')

const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudents,
  getSingleStudent,
  updateStudentProfile,
  adminUpdateStudent,
  writeExam,
} = require("../../controllers/students/studentController"); 
const isAdmin = require('../../middlewares/isAdmin');
const isStudent = require('../../middlewares/isStudent') 
const isStudentLogin = require('../../middlewares/isStudentLogin') 
const { isAuthenicated } = require("../../middlewares/isAuthenticated");


studentRouter.post(
  "/register",
  isAuthenicated(Admin),
  isAdmin,
  adminRegisterStudent
);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isAuthenicated(Student), isStudent, getStudentProfile);
studentRouter.get("/", isAuthenicated(Admin), isAdmin, getAllStudents);
studentRouter.put("/profile", isStudentLogin, isStudent, updateStudentProfile);
studentRouter.get("/:studentID", isAuthenicated(Admin), isAdmin, getSingleStudent);
studentRouter.put(
  "/:studentID",
  isAuthenicated(Admin),
  isAdmin,
  adminUpdateStudent
);
studentRouter.post("/exam/:examID", isStudentLogin, isStudent, writeExam);

module.exports = studentRouter
