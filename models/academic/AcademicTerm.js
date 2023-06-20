const mongoose = require("mongoose");

const academicTermSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of academic term must be provided"],
    },
    description: {
      type: String,
      required: [true, "Description of academic term must be provided"],
    },
    duration: {
      type: String,
      default: "3 months",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID of academic term must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AcademicTerm", academicTermSchema);
