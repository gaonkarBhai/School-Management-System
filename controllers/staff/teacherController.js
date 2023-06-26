const Teacher = require("../../models/staff/Teacher");
const AsyncHandler = require("express-async-handler");
const { hashPassword, isPassword } = require("../../utils/helpers");
const generateToken = require("../../utils/generateToken");

// Register Teacher | POST
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

// Login Teacher | POST
const loginTeacher = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid login crendentials" });
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

// GET ALL Teachers | GET
const getAllTeacher = AsyncHandler(async (req, res) => {
  const teachers = await Teacher.find({});
  res.status(201).json({
    status: "success",
    message: "All Teachers fetched successfully",
    data: teachers,
  });
});

// GET Single Teacher | GET
const getSingleTeacher = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.teacherID);
  if (!teacher) {
    throw new Error("No teacher found");
  }
  res.status(201).json({
    status: "success",
    message: "Teacher fetched successfully",
    data: teacher,
  });
});

// GET ALL Teachers | GET
const getTeacherProfile = AsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.userAuth?.id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacher) {
    throw new Error("No teacher found");
  }
  res.status(201).json({
    status: "success",
    message: "Teacher fetched successfully",
    data: teacher,
  });
});

// Update Teacher Profile | PUT
const updateTeacherProfile = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const emailExist = await Teacher.findOne({ email });
  if (emailExist) {
    throw new Error("This email already exists/taken");
  }
  if (password) {
    const hashedPassword = await hashPassword(password); // hashing psw
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth.id,
      { name, email, password: hashedPassword },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher details updated successfully",
    });
  } else {
    const teacher = await Teacher.findByIdAndUpdate(
      req.userAuth.id,
      { name, email },
      { new: true, runValidators: true }
    );
    return res.status(200).json({
      status: "success",
      data: teacher,
      message: "Teacher details updated successfully",
    });
  }
});

//Admin Update Teacher | PUT
const adminUpdatingTeacherProfile = AsyncHandler(async (req, res) => {
  const { program, classLevel, academicYear, subject } = req.body;
  const teacherFound = await Teacher.findById(req.params.teacherID);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  if (teacherFound.isWitdrawn){
    throw new Error("Action denied teacher is withdrawn");

  }
    if (program) {
      teacherFound.program = program;
      await teacherFound.save();
    }
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
  }
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
  }
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
  }
  return res.status(200).json({
    status: "success",
    data: teacherFound,
    message: "Teacher details updated successfully",
  });
});

module.exports = {
  registerTeacher,
  loginTeacher,
  getAllTeacher,
  getSingleTeacher,
  getTeacherProfile,
  updateTeacherProfile,
  adminUpdatingTeacherProfile,
};
