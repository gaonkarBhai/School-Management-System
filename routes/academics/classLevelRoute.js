const classLevelRouter = require("express").Router();
const {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
} = require("../../controllers/academics/classLevelController");
const isAdmin = require("../../middlewares/isAdmin");
const Admin = require("../../models/staff/Admin");
const { isAuthenicated } = require("../../middlewares/isAuthenticated");

// express route chaining
classLevelRouter
  .route("/")
  .post(isAuthenicated(Admin), isAdmin, createClassLevel)
  .get(isAuthenicated(Admin), isAdmin, getAllClassLevels);

classLevelRouter
  .route("/:id")
  .get(isAuthenicated(Admin), isAdmin, getSingleClassLevel)
  .put(isAuthenicated(Admin), isAdmin, updateClassLevel)
  .delete(isAuthenicated(Admin), isAdmin, deleteClassLevel);

module.exports = classLevelRouter;
