const programRouter = require("express").Router();
const {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deletePrograms,
} = require("../../controllers/academics/programController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

// express route chaining
programRouter
  .route("/")
  .post(isLogin, isAdmin, createProgram)
  .get(isLogin, isAdmin, getAllPrograms);

programRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleProgram)
  .put(isLogin, isAdmin, updateProgram)
  .delete(isLogin, isAdmin, deletePrograms);

module.exports = programRouter;
