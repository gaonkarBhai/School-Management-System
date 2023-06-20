const mongoose = require("mongoose");

const classLevelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the ClassLevel must be provided"],
    },
    description: {
      type: String,
      required: [true, "Descriptoin about ClassLevel must be provided"],
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
    subject: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Subject",
      },
    ],
    teacher: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ClassLevel", classLevelSchema);
