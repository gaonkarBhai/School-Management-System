const subjectRouter = require("express").Router();
const {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
} = require("../../controllers/academics/subjectController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

// express route chaining
subjectRouter.route("/:programID").post(isLogin, isAdmin, createSubject);
subjectRouter.route("/").get(isLogin, isAdmin, getAllSubjects);

subjectRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleSubject)
  .put(isLogin, isAdmin, updateSubject)
  .delete(isLogin, isAdmin, deleteSubject);

module.exports = subjectRouter;
