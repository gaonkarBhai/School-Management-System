const academicTermRouter = require("express").Router();
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controllers/academics/academicTermController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

// express route chaining
academicTermRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicTerm)
  .get(isLogin, isAdmin, getAllAcademicTerms);

academicTermRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleAcademicTerm)
  .put(isLogin, isAdmin, updateAcademicTerm)
  .delete(isLogin, isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
