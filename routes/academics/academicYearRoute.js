const academicYearRouter = require("express").Router();
const {
  createAcademicYear,
  getAllAcademicYear,
  getSingleAcademicYear,
} = require("../../controllers/academics/academicYearController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin"); 

academicYearRouter.post("/",isLogin, isAdmin,createAcademicYear);
academicYearRouter.get("/", isLogin, isAdmin, getAllAcademicYear);
academicYearRouter.get("/:id", isLogin, isAdmin, getSingleAcademicYear);

module.exports=academicYearRouter

