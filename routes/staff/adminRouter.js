const adminRouter = require('express').Router()
const Admin = require("../../models/staff/Admin");

const {
  registerAdmin,
  loginAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
  adminSuspendTeacher,
  adminUnsuspendTeacher,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublishExam,
  adminUnpublishExam,
} = require("../../controllers/staff/adminController"); // Admin controllers
// Admin Middleware's
const isAdmin = require("../../middlewares/isAdmin");
const advancedResult = require("../../middlewares/advancedResult");
const {isAuthenicated} = require("../../middlewares/isAuthenticated");

// Admin Routes
adminRouter.post("/register",registerAdmin);
adminRouter.post("/login",loginAdmin);
adminRouter.get(
  "/",
  isAuthenicated(Admin),
  isAdmin,
  advancedResult(Admin),
  getAllAdmin
);
adminRouter.get("/profile", isAuthenicated(Admin), isAdmin, getAdmin);
adminRouter.put("/", isAuthenicated(Admin), isAdmin, updateAdmin);
adminRouter.patch("/suspend/teacher/:id",adminSuspendTeacher);
adminRouter.patch("/unsuspend/teacher/:id", adminUnsuspendTeacher);
adminRouter.patch("/withdraw/teacher/:id",adminWithdrawTeacher);
adminRouter.patch("/unwithdraw/teacher/:id",adminUnwithdrawTeacher);
adminRouter.patch("/publish/exam/:id",adminPublishExam);
adminRouter.patch("/unpublish/exam/:id",adminUnpublishExam);

module.exports = adminRouter
