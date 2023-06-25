const mongoose = require("mongoose");

const AcademicYear = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Academic Year must be provided"],
    },
    fromYear: {
      type: Date,
      required: [true, "Staring date of academic year must be provided"],
    },
    toYear: {
      type: Date,
      required: [true, "Ending date of academic year must be provided"],
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID must be provided"],
    },
    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
    ],
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref:"Teacher"
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademicYear", AcademicYear);
