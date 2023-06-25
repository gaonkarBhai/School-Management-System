const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const Program = require('../../models/academic/Program')

// Create Program | POST
const createProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const newProgram = await Program.create({
    name,
    description,
    createdBy: req.userAuth.id,
    duration,
  });
  const admin = await Admin.findById(req.userAuth.id);
  admin.programs.push(newProgram._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Program created successfully",
    data: newProgram,
  });
});

// Get All Program | GET
const getAllPrograms = AsyncHandler(async (req, res) => {
  const programs = await Program.find({});
  res.status(200).json({
    status: "success",
    message: "Programs fetched successfully",
    data: programs,
  });
});

// Get Single Program | GET
const getSingleProgram = AsyncHandler(async (req, res) => {
  const program = await Program.findById(req.params.id).populate(
    "teachers student subjects"
  );
  res.status(200).json({
    status: "success",
    message: "Program fetched successfully",
    data: program,
  });
});

// Update Program | PUT
const updateProgram = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
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
      duration,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Program updated successfully",
    data: program,
  });
});

// Delete Program | DELETE
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
