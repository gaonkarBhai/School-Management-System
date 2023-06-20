const express = require("express");
const morgan = require("morgan");

const app = express();

const adminRouter = require("../routes/staff/adminRouter");
const academicYearRouter = require("../routes/academics/academicYearRoute");
const {
  globalErrorHandler,
  notFound,
} = require("../middlewares/GlobalErrorHandler");

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/admins", adminRouter); // Admin Router
app.use("/api/v1/academic-years", academicYearRouter); // Academic Year Router

// Error handler's (middleware)
app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
