const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const AcademicTerm = require("../../models/academic/AcademicTerm");

// Create Academic Term | POST
const createAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTerm = await AcademicTerm.findOne({ name });
  if (academicTerm) {
    throw new Error("Academic Term already exists");
  }
  const newAcademicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth.id,
  });
  const admin = await Admin.findById(req.userAuth.id)
  admin.academicTerms.push(newAcademicTerm._id);
  await admin.save()
  res.status(201).json({
    status: "success",
    message: "Academic year created successfully",
    data: newAcademicTerm,
  });
});

// Get All Academic Term | GET
const getAllAcademicTerms = AsyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find({});
  res.status(200).json({
    status: "success",
    message: "Academic terms fetched successfully",
    data: academicTerms,
  });
});

// Get Single Academic Term | GET
const getSingleAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTerm = await AcademicTerm.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Academic term fetched successfully",
    data: academicTerm,
  });
});

// Update Academic Term | PUT
const updateAcademicTerm = AsyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTermFound = await AcademicTerm.findOne({ name });
  if (academicTermFound) {
    throw new Error("Academic year already exists");
  }
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth.id,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Academic term updated successfully",
    data: academicTerm,
  });
});

// Delete Academic Term | DELETE
const deleteAcademicTerm = AsyncHandler(async (req, res) => {
  const academicTermFound = await AcademicTerm.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Academic term deleted successfully",
  });
});

module.exports = {
  createAcademicTerm,
  getAllAcademicTerms,
  getSingleAcademicTerm,
  updateAcademicTerm,
  deleteAcademicTerm,
};
