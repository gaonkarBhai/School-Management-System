const Teacher = require("../../models/staff/Teacher");
const Admin = require("../../models/staff/Admin");
const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassword } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

const registerTeacher = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (teacher) {
    throw new Error("Teacher already employed");
  }
  const hashedPassword = await hashPassword(password);
  const newTeacher = await Teacher.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    status: "success",
    message: "Teacher registered successfully",
    data: newTeacher,
  });
});

const loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res.status(400).json({ status:"failed",message: "Invalid login crendentials" });
  }
  const isPasswordMatched = await isPassword(password, teacher.password);
  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid login crendentials" });
  } else {
    const token = await generateToken(teacher._id);
    res.status(201).json({
      status: "success",
      message: "Teacher login successfully",
      data: token,
    });
  }
});

const getAllTeacher = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find({});
  res.status(201).json({
    status: "success",
    message: "All Teachers fetched successfully",
    data: teachers,
  });
});
const getSingleTeacher = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.teacherID);
  if(!teacher){
    throw new Error("No teacher found")
  }
  res.status(201).json({
    status: "success",
    message: "Teacher fetched successfully",
    data: teacher,
  });
});

module.exports = {
  registerTeacher,
  loginTeacher,
  getAllTeacher,
  getSingleTeacher,
};
