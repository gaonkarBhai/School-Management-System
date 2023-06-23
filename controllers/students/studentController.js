const AsyncHandler = require("express-async-handler");
const Student = require('../../models/academic/Student')
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const { hashPassword, isPassword } = require("../../utils/helpers");


const adminRegisterStudent = AsyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
  const student = await Student.findOne({ email });
  if(student){
    throw new Error("Student already exists")
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
module.exports = { adminRegisterStudent, loginStudent };