const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const YearGroup = require("../../models/academic/YearGroup");

const createYearGroup = AsyncHandler(async (req, res) => {
  const { name,academicYear} = req.body;
  const yearGroup = await YearGroup.findOne({ name });
  if (yearGroup) {
    throw new Error("Year Group already exists");
  }
  const newYearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth.id,
  });
  const admin = await Admin.findById(req.userAuth.id)
  if(!admin){
    throw new Error("Admin not found")
  }
  admin.yearGroups.push(newYearGroup._id);
  await admin.save()
  res.status(201).json({
    status: "success",
    message: "Year group created successfully",
    data: newYearGroup,
  });
});

const getAllYearGroups = AsyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find({});
  res.status(200).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: yearGroups,
  });
});

const getSingleYearGroup = AsyncHandler(async (req, res) => {
  const yearGroup = await YearGroup.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Year Group fetched successfully",
    data: yearGroup,
  });
});

const updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("Year group already exists");
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth.id,
    },
    { new: true, runValidators: true }
  );
  res.status(201).json({
    status: "success",
    message: "Year Group updated successfully",
    data: yearGroup,
  });
});

const deleteYearGroup = AsyncHandler(async (req, res) => {
  const yearGroupFound = await YearGroup.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Year Group deleted successfully",
  });
});

module.exports = {
  createYearGroup,
  getAllYearGroups,
  getSingleYearGroup,
  updateYearGroup,
  deleteYearGroup,
};
