const express = require("express");
const morgan = require("morgan");

const app = express();

const adminRouter = require("../routes/staff/adminRouter");
const teacherRouter = require("../routes/staff/teacherRouter");
const studentRouter = require("../routes/staff/studentRouter");
const academicYearRouter = require("../routes/academics/academicYearRoute");
const academicTermRouter = require("../routes/academics/academicTermRoute");
const classLevelRouter = require("../routes/academics/classLevelRoute");
const programRouter = require("../routes/academics/programRoute");
const subjectRouter = require("../routes/academics/subjectRoute");
const yearGroupRouter = require("../routes/academics/yearGroupRoute");
const examRouter = require("../routes/academics/examRoute");
const questionRouter = require("../routes/academics/questionRoute");

const {
  globalErrorHandler,
  notFound,
} = require("../middlewares/GlobalErrorHandler");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/admins", adminRouter); // Admin Router
app.use("/api/v1/teachers", teacherRouter); // Teacher Router
app.use("/api/v1/students", studentRouter); // Student Router
app.use("/api/v1/academic-years", academicYearRouter); // Academic Year Router
app.use("/api/v1/academic-terms", academicTermRouter); // Academic Term Router
app.use("/api/v1/class-levels", classLevelRouter); // Class Level Router
app.use("/api/v1/programs", programRouter); // Program Router
app.use("/api/v1/subjects", subjectRouter); // Subject Router
app.use("/api/v1/year-groups", yearGroupRouter); // Year GroupRouter 
app.use("/api/v1/exams", examRouter); // Year GroupRouter 
app.use("/api/v1/questions", questionRouter); // Question Router

// Error handler's (middleware)
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
