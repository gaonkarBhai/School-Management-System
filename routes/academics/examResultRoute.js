const examResultRouter = require("express").Router();
const {
checkResult
} = require("../../controllers/academics/examResultController");


// express route chaining
examResultRouter.route("/:examID").get(checkResult);
module.exports = examResultRouter;
