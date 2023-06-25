const adminRouter = require('express').Router()

const {
  registerAdmin,
  loginAdmin,
  getAdmin,
  getAllAdmin,
  deleteAdmin,
  updateAdmin,
  adminSuspendTeacher,
  adminUnsuspendTeacher,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublishExam,
  adminUnpublishExam,
} = require("../../controllers/staff/adminController"); // Admin controllers
// Admin Middleware's
const isLogin = require('../../middlewares/isLogin') 
const isAdmin = require('../../middlewares/isAdmin');

// Admin Routes
adminRouter.post("/register",registerAdmin);
adminRouter.post("/login",loginAdmin);
adminRouter.get("/", isLogin, isAdmin,getAllAdmin);
adminRouter.get("/profile", isLogin, getAdmin);
adminRouter.put("/", isLogin, isAdmin, updateAdmin);
adminRouter.patch("/suspend/teacher/:id",adminSuspendTeacher);
adminRouter.patch("/unsuspend/teacher/:id", adminUnsuspendTeacher);
adminRouter.patch("/withdraw/teacher/:id",adminWithdrawTeacher);
adminRouter.patch("/unwithdraw/teacher/:id",adminUnwithdrawTeacher);
adminRouter.patch("/publish/exam/:id",adminPublishExam);
adminRouter.patch("/unpublish/exam/:id",adminUnpublishExam);

module.exports = adminRouter
