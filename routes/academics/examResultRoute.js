const examResultRouter = require("express").Router();
const {
  checkResult,
  checkAllResult,
  adminPublishResult
} = require("../../controllers/academics/examResultController");
const isStudent = require("../../middlewares/isStudent");
const isStudentLogin = require("../../middlewares/isStudentLogin"); 
const isLogin = require("../../middlewares/isLogin");
const isAdmin = require("../../middlewares/isAdmin");
// express route chaining
examResultRouter.get("/", isLogin, isAdmin,checkAllResult);
examResultRouter.get("/:examID", isStudentLogin, isStudent,checkResult);
examResultRouter.post("/:examID", isLogin, isAdmin, adminPublishResult);
module.exports = examResultRouter;
