const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the program must be provided"],
    },
    description: {
      type: String,
      required: [true, "Description must be provided"],
    },
    duration: {
      type: String,
      default: "4 years",
    },
    code: {
      type: String,
      default: function () {
        return (
          this.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .toUpperCase() +
          Math.floor(10 + Math.random() * 90) +
          Math.floor(10 + Math.random() * 90)
        );
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Admin Object Id must be provided"],
    },
    teachers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
        default: [],
      },
    ],
    student: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        default: [],
      },
    ],
    subjects: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Program", programSchema);
