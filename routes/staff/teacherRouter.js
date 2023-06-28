const teacherRouter = require('express').Router()

const {
  registerTeacher,
  loginTeacher,
  getAllTeacher,
  getSingleTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  adminUpdatingTeacherProfile,
} = require("../../controllers/staff/teacherController"); // teacher controllers
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin') 
const isTeacher = require("../../middlewares/isTeacher"); 
const isTeacherLogin = require("../../middlewares/isTeacherLogin"); 

teacherRouter.post("/register",isLogin,isAdmin, registerTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/", isLogin,isAdmin, getAllTeacher);
teacherRouter.get("/profile", isTeacherLogin, isTeacher, getTeacherProfile);
teacherRouter.put("/profile", isTeacherLogin, isTeacher, updateTeacherProfile);
teacherRouter.get("/:teacherID", isLogin, isAdmin, getSingleTeacher);
teacherRouter.put("/:teacherID", isLogin, isAdmin, adminUpdatingTeacherProfile);

module.exports = teacherRouter;
