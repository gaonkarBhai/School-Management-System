const studentRouter = require('express').Router()

const {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudents,
  getSingleStudent,
  updateStudentProfile,
  adminUpdateStudent,
} = require("../../controllers/students/studentController"); 
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin') 
const isStudent = require('../../middlewares/isStudent') 
const isStudentLogin = require('../../middlewares/isStudentLogin') 

studentRouter.post("/register",isLogin,isAdmin, adminRegisterStudent);
studentRouter.post("/login", isLogin, isAdmin, loginStudent);
studentRouter.get("/profile", isStudentLogin, isStudent, getStudentProfile);
studentRouter.get("/", isStudentLogin, isStudent, getAllStudents);
studentRouter.put("/profile", isStudentLogin, isStudent, updateStudentProfile);
studentRouter.get("/:studentID", isLogin, isAdmin, getSingleStudent);
studentRouter.put("/:studentID", isLogin, isAdmin, adminUpdateStudent);

module.exports = studentRouter
