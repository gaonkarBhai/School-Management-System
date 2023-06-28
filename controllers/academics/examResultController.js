const AsyncHandler = require("express-async-handler");
const ExamResult = require('../../models/academic/ExamResult')
const Student = require('../../models/academic/Student')

const checkResult = AsyncHandler(async(req,res)=>{
  const studentFound = await Student.findById(req.userAuth?.id)
  if(!studentFound){
    throw new Error("Student not found")
  }
  const examResult = await ExamResult.findOne({
    studentID: studentFound?.studentId,
    _id: req.params.examID,
  }).populate("classLevel academicYear academicTerm").populate({
    path:"exam",
    populate:{
      path:"questions"
    }
  });
  if(examResult?.isPublished==false){
    throw new Error("Exam Result is not available check out later");
  }
  res.status(200).json({
    status: "success",
    message: "Exam result fetched",
    data: examResult,
    student:studentFound
  });
})
const checkAllResult = AsyncHandler(async(req,res)=>{
  const results = await ExamResult.find({}).select("exam").populate("exam")
  res.status(200).json({
    status:"success",
    message:"Exam result fetched",
    data:results
  })
})
const adminPublishResult = AsyncHandler(async(req,res)=>{
  const results = await ExamResult.findById(req.params.examID)
  if(!results){
    throw new Error("Exam result not found")
  }
  const publishResult = await ExamResult.findByIdAndUpdate(req.params.examID,{
    isPublished:req.body.publish,
  },{new:true})
  res.status(200).json({
    status: "success",
    message: "Exam result updated",
    data: publishResult,
  });
})
module.exports = { checkResult, checkAllResult, adminPublishResult };