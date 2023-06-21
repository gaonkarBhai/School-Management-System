const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const Program = require('../../models/academic/Program')

const createProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("program already exists");
  }
  const newProgram = await Program.create({
    name,
    description,
    createdBy: req.userAuth.id,
  });
  const admin = await Admin.findById(req.userAuth.id);
  admin.programs.push(newProgram._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "class created successfully",
    data: newProgram,
  });
});

const getAllPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find({});
  res.status(200).json({
    status: "success",
    message: "Programs fetched successfully",
    data: programs,
  });
});

const getSingleProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

const updateProgram = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const program = await Program.findByIdAndUpdate(
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
    message: "Program updated successfully",
    data: program,
  });
});

const deletePrograms = AsyncHandler(async (req, res) => {
  const programFound = await Program.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Program deleted successfully",
  });
});

module.exports = {
  createProgram,
  getAllPrograms,
  getSingleProgram,
  updateProgram,
  deletePrograms,
};
