const academicYearRouter = require("express").Router();
const Admin = require("../../models/staff/Admin");

const {
  createAcademicYear,
  getAllAcademicYear,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
} = require("../../controllers/academics/academicYearController");
const isAdmin = require("../../middlewares/isAdmin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");


// express route chaining
academicYearRouter
  .route("/")
  .post(isAuthenicated(Admin), isAdmin, createAcademicYear)
  .get(isAuthenicated(Admin), isAdmin, getAllAcademicYear);

academicYearRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleAcademicYear)
  .put(isAuthenicated(Admin), isAdmin, updateAcademicYear)
  .delete(isAuthenicated(Admin), isAdmin, deleteAcademicYear);

module.exports=academicYearRouter

