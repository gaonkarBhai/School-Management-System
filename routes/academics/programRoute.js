const programRouter = require("express").Router();
const {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deletePrograms,
} = require("../../controllers/academics/programController");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../models/staff/Admin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

// express route chaining
programRouter
  .route("/")
  .post(isAuthenicated(Admin), isAdmin, createProgram)
  .get(isAuthenicated(Admin), isAdmin, getAllPrograms);

programRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleProgram)
  .put(isAuthenicated(Admin), isAdmin, updateProgram)
  .delete(isAuthenicated(Admin), isAdmin, deletePrograms);

module.exports = programRouter;
