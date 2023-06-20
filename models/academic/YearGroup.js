const mongoose = require("mongoose");

const yearGroup = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of Year Group must be provided"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID of Year Group must be provided"],
    },
    academicYear: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year of Year Group must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YearGroup", yearGroup);
