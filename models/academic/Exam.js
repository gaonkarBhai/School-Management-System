const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exam name must be provided"],
    },
    description: {
      type: String,
      required: [true, "description must be provided"],
    },
    Subject: {
      type: mongoose.Types.ObjectId,
      ref: "subject",
      required: [true, "Subject must be provided"],
    },
    program: {
      type: mongoose.Types.ObjectId,
      ref: "Program",
      required: [true, "program ID must be provided"],
    },
    passMark: {
      type: Number,
      default: 50,
    },
    totalMark: {
      type: Number,
      default: 100,
    },
    academicTerm: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "AcademicTerm ID must be provided"],
    },
    duration: {
      type: String,
      default: "90 min",
    },
    examDate: {
      type: Date,
      required: [true, "Exam date must be provided"],
    },
    examTime: {
      type: String,
      required: [true, "Exam time must be provided"],
    },
    examType: {
      type: String,
      default: "internals",
    },
    examStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "live"],
    },
    questions: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Question",
      },
    ],
    classLevel: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClassLevel",
        required: [true, "classLevels ID must be provided"],
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Teacher",
      required: [true, "Teacher ID must be provided"],
    },
    academicTerm: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Academic Term ID must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", ExamSchema);
