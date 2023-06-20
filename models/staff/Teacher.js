const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Teacher name must be provided"],
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
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
      default: function () {
        return (
          "TEA" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    isWitdrawn: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "Subject",
      required: [true, "Subject ID must be provided"],
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    program: {
      type: mongoose.Types.ObjectId,
      ref: "Program",
      required: [true, "program ID must be provided"],
    },
    classLevel: {
      type: mongoose.Types.ObjectId,
      ref: "ClassLevel",
      required: [true, "ClassLevel ID must be provided"],
    },
    academicYear: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "AcademicYear ID must be provided"],
    },
    examCreated: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin ID must be provided"],
    },
    academicTerm: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicTerm",
      required: [true, "Academic Term ID must be provided"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
