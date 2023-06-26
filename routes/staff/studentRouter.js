const studentRouter = require('express').Router()

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
const isLogin = require('../../middlewares/isLogin') 
const isStudent = require('../../middlewares/isStudent') 
const isStudentLogin = require('../../middlewares/isStudentLogin') 

studentRouter.post("/register",isLogin,isAdmin, adminRegisterStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/", isLogin, isAdmin, getAllStudents);
studentRouter.put("/profile", isStudentLogin, isStudent, updateStudentProfile);
studentRouter.get("/:studentID", isLogin, isAdmin, getSingleStudent);
studentRouter.put("/:studentID", isLogin, isAdmin, adminUpdateStudent);
studentRouter.post("/exam/:examID", isStudentLogin, isStudent, writeExam);

module.exports = studentRouter
