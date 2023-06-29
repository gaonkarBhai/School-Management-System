const examResultRouter = require("express").Router();
const {
  checkResult,
  checkAllResult,
  adminPublishResult
} = require("../../controllers/academics/examResultController");
const isStudent = require("../../middlewares/isStudent");
const Admin = require("../../models/staff/Admin");
const Student = require("../../models/academic/Student");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");
const isAdmin = require("../../middlewares/isAdmin");

examResultRouter.get("/", isAuthenicated(Admin), isAdmin,checkAllResult);
examResultRouter.get("/:examID", isAuthenicated(Student), isStudent,checkResult);
examResultRouter.post("/:examID", isAuthenicated(Admin), isAdmin, adminPublishResult);

module.exports = examResultRouter;
