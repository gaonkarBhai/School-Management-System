const Student = require("../models/academic/Student");


const isStudent = async (req, res, next) => {
  const userId = req?.userAuth?.id;
  const studentFound = await Student.findById(userId);
  if (teacherFound?.role === "student") {
    next();
  } else {
    next(new Error("access denied students only"));
  }
};

module.exports = isStudent;
