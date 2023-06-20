const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
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
          "STU" +
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
    role: {
      type: String,
      default: "student",
    },
    classLevels: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ClassLevel",
        required: [true, "classLevels ID must be provided"],
      },
    ],
    currentClassLevel: [
      {
        type: String,
        default: function () {
          return this.classLevels[this.classLevels.length - 1];
        },
      },
    ],
    academicYear: {
      type: mongoose.Types.ObjectId,
      ref: "AcademicYear",
      required: [true, "AcademicYear ID must be provided"],
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },
    examResult: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ExamResult",
      },
    ],
    program: {
      type: mongoose.Types.ObjectId,
      ref: "Program",
      required: [true, "program ID must be provided"],
    },
    isPromotedToLevel200:{
        type:Boolean,
        default:false
    },
    isPromotedToLevel300:{
        type:Boolean,
        default:false
    },
    isPromotedToLevel400:{
        type:Boolean,
        default:false
    },
    isGraduated:{
        type:Boolean,
        default:false
    },
    isSuspended:{
        type:Boolean,
        default:false
    },
    perfectName:{
        type:String,
    },
    yearGraduated:{
        type:String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
