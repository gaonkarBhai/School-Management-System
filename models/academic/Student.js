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
    studentId: {
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
        type: String,
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
    },
    isPromotedTo2ndYear:{
        type:Boolean,
        default:false
    },
    isPromotedTo3rdYear:{
        type:Boolean,
        default:false
    },
    isPromotedTo4thYear:{
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
        type:Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
