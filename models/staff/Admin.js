const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin name must be provided"],
    },
    email: {
      type: String,
      required: [true, "Email ID must be provided"],
      unique: [true, "Duplication of email"],
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minlength: [5, "Minimum length must more then 5"],
    },
    role: {
      type: String,
      default: "admin",
    },
    academicTerm: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AcademicTerm",
      },
    ],
    academicYear: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AcademicYear",
      },
    ],
    classLevels: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClassLevel",
      },
    ],
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    students: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
