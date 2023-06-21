const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const Student = require("../../models/academic/Student");
const Teacher = require("../../models/staff/Teacher");
const AcademicYear = require("../../models/academic/AcademicYear");

const createAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  const academicYear = await AcademicYear.findOne({ name });
  if (academicYear) {
    throw new Error("Academic Year already exists");
  }
  const newAcademicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth.id,
  });
  const admin = await Admin.findById(req.userAuth.id)
  admin.academicYears.push(newAcademicYear._id);
  await admin.save()
  res.status(201).json({
    status: "success",
    message: "Academic year created successfully",
    data: newAcademicYear,
  });
});

const getAllAcademicYear = AsyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find({});
  res.status(200).json({
    status: "success",
    message: "Academic years fetched successfully",
    data: academicYears,
  });
});

const getSingleAcademicYear = AsyncHandler(async (req, res) => {
  const academicYear = await AcademicYear.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Academic year fetched successfully",
    data: academicYear,
  });
});

const updateAcademicYear = AsyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  const academicYearFound = await AcademicYear.findOne({name})
  if (academicYearFound) {
    throw new Error("Academic year already exists");
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(req.params.id,{
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth.id,
  },{new:true,runValidators:true});
  res.status(201).json({
    status: "success",
    message: "Academic year updated successfully",
    data: academicYear,
  });
});

const deleteAcademicYear = AsyncHandler(async (req, res) => {
  const academicYearFound = await AcademicYear.findByIdAndDelete(req.params.id)
  res.status(200).json({
    status: "success",
    message: "Academic year deleted successfully",
  });
});

module.exports = {
  createAcademicYear,
  getAllAcademicYear,
  getSingleAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
