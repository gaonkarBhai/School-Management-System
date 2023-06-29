const yearGroupRouter = require("express").Router();
const {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroup,
  deleteYearGroup,
} = require("../../controllers/academics/yearGroupsController");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../models/staff/Admin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

// express route chaining
yearGroupRouter
  .route("/")
  .post(isAuthenicated(Admin), isAdmin, createYearGroup)
  .get(isAuthenicated(Admin), isAdmin, getAllYearGroups);

yearGroupRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleYearGroup)
  .put(isAuthenicated(Admin), isAdmin, updateYearGroup)
  .delete(isAuthenicated(Admin), isAdmin, deleteYearGroup);

module.exports = yearGroupRouter;
