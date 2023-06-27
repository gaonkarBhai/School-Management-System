const AsyncHandler = require("express-async-handler");
const checkResult = AsyncHandler(async(req,res)=>{
  res.status(200).json("check result")
})
module.exports = {checkResult}