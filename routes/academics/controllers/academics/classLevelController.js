const AsyncHandler = require("express-async-handler");
const Admin = require("../../models/staff/Admin");
const ClassLevel = require('../../models/academic/ClassLevel')

const createClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const classLevelFound = await ClassLevel.findOne({ name });
  if (classLevelFound) {
    throw new Error("Class already exists");
  }
  const newClassLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth.id,
  });
  const admin = await Admin.findById(req.userAuth.id);
  admin.classLevels.push(newClassLevel._id);
  await admin.save();
  res.status(201).json({
    status: "success",
    message: "class created successfully",
    data: newClassLevel,
  });
});

const getAllClassLevels = AsyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find({});
  res.status(200).json({
    status: "success",
    message: "Class Levels fetched successfully",
    data: classLevels,
  });
});

const getSingleClassLevel = AsyncHandler(async (req, res) => {
  const classLevel = await ClassLevel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: "ClassLevel fetched successfully",
    data: classLevel,
  });
});

const updateClassLevel = AsyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const classLevelFound = await ClassLevel.findOne({ name });
  if (classLevelFound) {
    throw new Error("Academic year already exists");
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
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
    message: "Class Level updated successfully",
    data: classLevel,
  });
});

const deleteClassLevel = AsyncHandler(async (req, res) => {
  const classLevelFound = await ClassLevel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "ClassLevel deleted successfully",
  });
});

module.exports = {
  createClassLevel,
  getAllClassLevels,
  getSingleClassLevel,
  updateClassLevel,
  deleteClassLevel,
};
