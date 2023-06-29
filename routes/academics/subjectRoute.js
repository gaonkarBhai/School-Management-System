const subjectRouter = require("express").Router();
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controllers/academics/subjectController");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../models/staff/Admin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

// express route chaining
subjectRouter.route("/:programID").post(isAuthenicated(Admin), isAdmin, createSubject);
subjectRouter.route("/").get(isAuthenicated(Admin), isAdmin, getAllSubjects);

subjectRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleSubject)
  .put(isAuthenicated(Admin), isAdmin, updateSubject)
  .delete(isAuthenicated(Admin), isAdmin, deleteSubject);

module.exports = subjectRouter;
