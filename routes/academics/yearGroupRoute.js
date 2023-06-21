const yearGroupRouter = require("express").Router();
const {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require("../../controllers/academics/yearGroupsController");
const isAdmin = require("../../middlewares/isAdmin");
const isLogin = require("../../middlewares/isLogin");

// express route chaining
yearGroupRouter
  .route("/")
  .post(isLogin, isAdmin, createYearGroup)
  .get(isLogin, isAdmin, getAllYearGroups);

yearGroupRouter
  .route("/:id")
  .get(isLogin, isAdmin, getSingleYearGroup)
  .put(isLogin, isAdmin, updateYearGroup)
  .delete(isLogin, isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
