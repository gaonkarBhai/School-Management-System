const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the subject must be provided"],
    },
    description: {
      type: String,
      required: [true, "Descriptoin about subject must be provided"],
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Subject teacher ID must be provided"],
    },
    academicTerm: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Academic Term ID must be provided"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID must be provided"],
    },
    duration: {
      type: String,
      required: [true, "Duration of the course must be provided"],
      default:"3 months"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
