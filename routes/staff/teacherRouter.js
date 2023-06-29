const teacherRouter = require('express').Router()
const Teacher = require("../../models/staff/Teacher");
const Admin = require("../../models/staff/Admin");

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
const isTeacher = require("../../middlewares/isTeacher"); 
const advancedResult = require("../../middlewares/advancedResult"); 
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

teacherRouter.post(
  "/register",
  isAuthenicated(Admin),
  isAdmin,
  registerTeacher
);
teacherRouter.post("/login", loginTeacher);
teacherRouter.get(
  "/",
  isAuthenicated(Admin),
  isAdmin,
  advancedResult(Teacher, "examCreated"),
  getAllTeacher
);
teacherRouter.get(
  "/profile",
  isAuthenicated(Teacher),
  isTeacher,
  getTeacherProfile
);
teacherRouter.put(
  "/profile",
  isAuthenicated(Teacher),
  isTeacher,
  updateTeacherProfile
);
teacherRouter.get("/:teacherID",   isAuthenicated(Admin), isAdmin, getSingleTeacher);
teacherRouter.put("/:teacherID",   isAuthenicated(Admin), isAdmin,adminUpdatingTeacherProfile);

module.exports = teacherRouter;
