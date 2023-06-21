const AsyncHandler = require("express-async-handler");
const Subject = require("../../models/academic/Subject");
const Program = require("../../models/academic/Program");

const createSubject = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const programFound = await Program.findById(req.params.programID)
  const subjectFound = await Subject.findOne({ name });
  if (!programFound) {
    throw new Error("Program does not exists");
  }
  if (subjectFound) {
    throw new Error("Subject already exists");
  }
  const newSubject = await Subject.create({
    name,
    description,
    createdBy: req.userAuth.id,
  });

  programFound.subjects.push(newSubject._id);
  await programFound.save()

  res.status(201).json({
    status: "success",
    message: "subject created successfully",
    data: newSubject,
  });
});

const getAllSubjects = AsyncHandler(async (req, res) => {
  const subjects = await Subject.find({});
  res.status(200).json({
    status: "success",
    message: "Subjects fetched successfully",
    data: subjects,
  });
});

const getSingleSubject = AsyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Subject fetched successfully",
    data: subject,
  });
});

const updateSubject = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }
  const subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      createdBy: req.userAuth.id,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Subject updated successfully",
    data: subject,
  });
});

const deleteSubject = AsyncHandler(async (req, res) => {
  const subjectFound = await Subject.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Subject deleted successfully",
  });
});

module.exports = {
  createSubject,
  getAllSubjects,
  getSingleSubject,
  updateSubject,
  deleteSubject,
};
