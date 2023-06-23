const studentRouter = require('express').Router()

const {
  adminRegisterStudent,
  loginStudent,
} = require("../../controllers/students/studentController"); 
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin') 

studentRouter.post("/register",isLogin,isAdmin, adminRegisterStudent);
studentRouter.post("/login", isLogin, isAdmin, loginStudent);

module.exports = studentRouter
