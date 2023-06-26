const mongoose = require("mongoose");

const examResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: [true, "student ID must be provided"],
    },
    exam: {
      type: mongoose.Types.ObjectId,
      ref: "Exam",
      required: [true, "student ID must be provided"],
    },
    // subject: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Subject",
    //   required: [true, "Subject ID must be provided"],
    // },
    classLevel: {
      type: mongoose.Types.ObjectId,
      ref: "ClassLevel",
      required: [true, "Subject ID must be provided"],
    },
    academicYear: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "Academic Year ID must be provided"],
    },
    academicTerm: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Academic Term ID must be provided"],
    },
    grade: {
      type: Number,
      required: [true, "Greade must be provided"],
    },
    score: {
      type: Number,
      required: [true, "Score must be provided"],
    },
    passMark: {
      type: Number,
      // required: [true, "Passing marks must be provided"],
    },
    // position: {
    //   type: Number,
    //   required: [true, "Position must be provided"],
    // },
    status: {
      type: String,
      enum: ["failed", "passed"],
      default: "failed",
    },
    remark: {
      type: String,
      enum: ["Outstanding", "Excellent", "Good", "Poor",'Very Good',"Fair"],
      default: "Poor",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExamResult", examResultSchema);
