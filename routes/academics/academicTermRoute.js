const academicTermRouter = require("express").Router();
const {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
} = require("../../controllers/academics/academicTermController");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../models/staff/Admin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");


// express route chaining
academicTermRouter
  .route("/")
  .post(isAuthenicated(Admin), isAdmin, createAcademicTerm)
  .get(isAuthenicated(Admin), isAdmin, getAllAcademicTerms);

academicTermRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleAcademicTerm)
  .put(isAuthenicated(Admin), isAdmin, updateAcademicTerm)
  .delete(isAuthenicated(Admin), isAdmin, deleteAcademicTerm);

module.exports = academicTermRouter;
