const AsyncHandler = require("express-async-handler");
const Student = require("../../models/academic/Student");
const Admin = require("../../models/staff/Admin");
const Exam = require("../../models/academic/Exam");
const ExamResult = require("../../models/academic/ExamResult");
const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassword } = require("../../utils/helpers");

// Admin Register Student | POST
const adminRegisterStudent = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminFound = await Admin.findById(req.userAuth?.id);
  if (!adminFound) {
    throw new Error("Admin not found");
  }
  const student = await Student.findOne({ email });
  if (student) {
    throw new Error("Student already exists");
  }
  const hashedPassword = await hashPassword(password); // hashing psw
  const user = await Student.create({ name, email, password: hashedPassword });
  adminFound?.students.push(user?._id);
  await adminFound.save();
  res.status(201).json({
    status: "success",
    message: "Student created successfully",
    data: user,
  });
});

// Student login | POST
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

// Student Profile | GET
const getStudentProfile = AsyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?.id)
    .select("-password -createdAt -updatedAt")
    .populate("examResult");
  if (!student) {
    throw new Error("No student found");
  }
  const studentProfile = {
    name: student?.name,
    email: student?.email,
    currentClassLevel: student?.currentClassLevel,
    program: student?.program,
    dateAdmitted: student?.dateAdmitted,
    isSuspended: student?.isSuspended,
    isWitdrawn: student?.isWitdrawn,
    studentId: student?.studentId,
    perfectName: student?.perfectName,
  };
  const examResult = student?.examResult;
  const currentExamResult = examResult[examResult.length - 1];
  const isPublished = currentExamResult?.isPublished;
  res.status(201).json({
    status: "success",
    message: "Student fetched successfully",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
  });
});

// Student ALl Profile | GET
const getAllStudents = AsyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.status(201).json({
    status: "success",
    message: "All students fetched successfully",
    data: students,
  });
});

// Admin Single Student Profile | GET
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

// Student Update Profile | PUT
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

// Admin Update Student Profile | PUT
const adminUpdateStudent = AsyncHandler(async (req, res) => {
  const {
    classLevels,
    program,
    name,
    email,
    perfectName,
    academicYear,
    isWitdrawn,
    isSuspended,
  } = req.body;
  const student = await Student.findById(req.params.studentID);
  if (!student) {
    throw new Error("No student found");
  }
  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.studentID,
    {
      $set: {
        program,
        name,
        email,
        perfectName,
        academicYear,
        isWitdrawn,
        isSuspended,
      },
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

// Student Write Exam | POST
const writeExam = AsyncHandler(async (req, res) => {
  const studentFound = await Student.findById(req.userAuth?.id);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const examFound = await Exam.findById(req.params.examID).populate(
    "questions academicTerm"
  );
  if (!examFound) {
    throw new Error("Exam not found");
  }
  const questions = examFound?.questions;
  const studentAnswers = req.body.answers;

  if (studentAnswers.length != questions.length) {
    throw new Error("You have not answered all the questions");
  }
  // check for duplication
  const studentFoundInResult = await ExamResult.findOne({
    student: studentFound?._id,
  });

  if (studentFoundInResult) {
    throw new Error("You already taken exam");
  }
  if (studentFound.isWitdrawn || studentFound.isSuspended) {
    throw new Error("You are suspended/withdrawn, You can't write exam");
  }

  let correctAnswer = 0;
  let wrongAnswer = 0;
  let totalQuestion = questions.length;
  let grade = 0;
  let score = 0;
  let answersedQuestion = 0;
  let status = "";
  let remark = "";

  for (let i = 0; i < questions.length; i++) {
    let question = questions[i];
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswer++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswer++;
    }
  }
  grade = (correctAnswer / totalQuestion) * 100;
  answersedQuestion = questions.map((currQuestion) => {
    return {
      question: currQuestion.question,
      correctAnswer: currQuestion.correctAnswer,
      isCorrect: currQuestion.isCorrect,
    };
  });
  if (grade >= 50) {
    status = "passed";
  } else {
    status = "failed";
  }
  if (grade >= 90) {
    remark = "Outstanding";
  } else if (grade >= 80) {
    remark = "Excellent";
  } else if (grade >= 70) {
    remark = "Very Good";
  } else if (grade >= 60) {
    remark = "Good";
  } else if (grade >= 50) {
    remark = "Fair";
  } else {
    remark = "Poor";
  }
  // exam result
  const result = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remark,
    classLevel: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answersedQuestion,
  });
  studentFound?.examResult.push(result?._id);
  await studentFound.save();

  if (
    examFound.academicTerm.name === "2nd term" &&
    status == "passed" &&
    studentFound?.currentClassLevel == "1st year"
  ) {
    studentFound.classLevels.push("2nd year");
    studentFound.currentClassLevel = "2nd year";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "4nd term" &&
    status == "passed" &&
    studentFound?.currentClassLevel == "2st year"
  ) {
    studentFound.classLevels.push("3nd year");
    studentFound.currentClassLevel = "3nd year";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "6nd term" &&
    status == "passed" &&
    studentFound?.currentClassLevel == "3st year"
  ) {
    studentFound.classLevels.push("4nd year");
    studentFound.currentClassLevel = "4nd year";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "8nd term" &&
    status == "passed" &&
    studentFound?.currentClassLevel == "4st year"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date();
    await studentFound.save();
  }

  res.status(200).json({
    status: "success",
    data: "you have submitted you exam. Check later for your result",
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
  writeExam,
};
