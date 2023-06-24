const AsyncHandler = require("express-async-handler");
const Student = require("../../models/academic/Student");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassword } = require("../../utils/helpers");

const adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student already exists");
  }
  const hashedPassword = await hashPassword(password); // hashing psw
  const user = await Student.create({ name, email, password: hashedPassword });
  res.status(201).json({
    status: "success",
    message: "Student created successfully",
    data: user,
  });
});

const loginStudent = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (!student) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid login crendentials" });
  }
  const isPasswordMatched = await isPassword(password, student.password);
  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid login crendentials" });
  } else {
    const token = await generateToken(student._id);
    res.status(201).json({
      status: "success",
      message: "student login successfully",
      data: token,
    });
  }
});
const getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?.id).select(
    "-password -createdAt -updatedAt"
  );
  if (!student) {
    throw new Error("No student found");
  }
  res.status(201).json({
    status: "success",
    message: "Student fetched successfully",
    data: student,
  });
});
const getAllStudents = AsyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.status(201).json({
    status: "success",
    message: "All students fetched successfully",
    data: students,
  });
});
const getSingleStudent = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.studentID);
  if (!student) {
    throw new Error("No student found");
  }
  res.status(200).json({
    status: "success",
    message: "student fetched successfully",
    data: student,
  });
});
const updateStudentProfile = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const emailExist = await Student.findOne({ email });
  if (emailExist) {
    throw new Error("This email already exists/taken");
  }
  if (password) {
    const hashedPassword = await hashPassword(password); // hashing psw
    const student = await Student.findByIdAndUpdate(
      req.userAuth.id,
      { email, password: hashedPassword },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      data: student,
      message: "Student details updated successfully",
    });
  } else {
    const student = await Student.findByIdAndUpdate(
      req.userAuth.id,
      { email },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      data: student,
      message: "Student details updated successfully",
    });
  }
});

const adminUpdateStudent = AsyncHandler(async (req, res) => {
  const { classLevels, program, name, email, perfectName, academicYear } =
    req.body;
  const student = await Student.findById(req.params.studentID);
  if (!student) {
    throw new Error("No student found");
  }
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: { program, name, email, perfectName, academicYear },
      $addToSet: { classLevels },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "student updated successfully",
    data: updatedStudent,
  });
});

module.exports = {
  adminRegisterStudent,
  loginStudent,
  getStudentProfile,
  getAllStudents,
  getSingleStudent,
  updateStudentProfile,
  adminUpdateStudent,
};
