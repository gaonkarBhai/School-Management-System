const teacherRouter = require('express').Router()

const {
  registerTeacher,
  loginTeacher,
  getAllTeacher,
  getSingleTeacher,
} = require("../../controllers/staff/teacherController"); // teacher controllers
const isAdmin = require('../../middlewares/isAdmin');
const isLogin = require('../../middlewares/isLogin') 

teacherRouter.post("/register", registerTeacher);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get("/", isLogin,isAdmin, getAllTeacher);
teacherRouter.get("/:teacherID", isLogin, isAdmin, getSingleTeacher);

module.exports = teacherRouter;
