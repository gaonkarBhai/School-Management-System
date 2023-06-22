const Teacher = require("../models/staff/Teacher");


const isTeacher = async (req, res, next) => {
  const userId = req?.userAuth?.id;
  const teacherFound = await Teacher.findById(userId);
  if (teacherFound?.role === "teacher") {
    next();
  } else {
    next(new Error("access denied teachers only"));
  }
};

module.exports = isTeacher;
