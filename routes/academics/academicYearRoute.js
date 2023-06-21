const academicYearRouter = require("express").Router();
const {
  createAcademicYear,
  getAllAcademicYear,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controllers/academics/academicYearController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin"); 

// express route chaining
academicYearRouter
  .route("/")
  .post(isLogin, isAdmin, createAcademicYear)
  .get(isLogin, isAdmin, getAllAcademicYear);

academicYearRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleAcademicYear)
  .put(isLogin, isAdmin, updateAcademicYear)
  .delete(isLogin, isAdmin, deleteAcademicYear);

module.exports=academicYearRouter

