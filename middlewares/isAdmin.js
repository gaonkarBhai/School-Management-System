const Admin = require("../models/staff/Admin");

const isAdmin = async (req, res, next) => {
  const userId = req?.userAuth?.id
  const adminFound = await Admin.findById(userId)
  if(adminFound?.role==='admin'){
    next()
  }else{
    next(new Error("access denied"))
  }
};

module.exports = isAdmin;
