const Admin = require("../../models/staff/Admin");
const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const {hashPassword, isPassword} =require('../../utils/helpers')

// Admin Registration | POST
const registerAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminFound = await Admin.findOne({ email });
  if (adminFound)
    throw new Error("Admin already exists")
  const hashedPassword = await hashPassword(password); // hashing psw
  const user = await Admin.create({ name, email, password: hashedPassword });
  res.status(201).send({
    status: "success",
    data: user,
    message: "Admin registered successfully",
  });
});

// Admin Login | POST
const loginAdmin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user)
    throw new Error("Admin does not exists")
  const isPasswordMatch = await isPassword(password, user.password); // comparing psw
  if (!isPasswordMatch) {
        throw new Error("Invalid login crendentials")
  } else {
    return res.status(201).send({
      status: "success",
      data: generateToken(user._id),
      message: "Admin login successfully",
    });
  }
});

// Get All Admins | GET
const getAllAdmin = AsyncHandler(async (req, res) => {
  res.status(200).json(res.result);
});

// Get Admin (Admin Profile) | GET
const getAdmin = AsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth.id)
    .select("-createdAt -updatedAt -__v -password")
    .populate(
      "academicYears academicTerms classLevels teachers students programs yearGroups"
    );
  if (!admin) {
    throw new Error("Admin not found");
  } else {
    return res
      .status(200)
      .json({
        status: "success",
        data: admin,
        message: "Admin profile fetched successfully",
      });
  }
});

// Update Admin (Admin Profile) | PUT
const updateAdmin = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const emailExist = await Admin.findOne({email})
  if (emailExist) {
    throw new Error("This email already exists/taken");
  } 
  if(password) {
    const hashedPassword = await hashPassword(password); // hashing psw
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth.id,
      { name, email, password: hashedPassword },
      { new: true, runValidators: true }
    ).select("-createdAt -updatedAt -__v -password");
    return res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin details updated successfully",
    });
  }else{
    const admin = await Admin.findByIdAndUpdate(
      req.userAuth.id,
      { name, email },
      { new: true, runValidators: true }
    ).select("-createdAt -updatedAt -__v -password");
    return res.status(200).json({
      status: "success",
      data: admin,
      message: "Admin details updated successfully",
    });
  }
});

// Update Admin (Admin Profile) | PUT
const adminSuspendTeacher = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin suspend teacher",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};
const adminUnsuspendTeacher = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin unsuspend teacher",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};
const adminWithdrawTeacher = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin withdraw teacher",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};
const adminUnwithdrawTeacher = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin unwithdraw teacher",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};
const adminPublishExam = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin publish exam result",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};
const adminUnpublishExam = (req, res) => {
  try {
    res.status(201).send({
      status: "success",
      data: "Admin unpublish exam result",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      data: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
  getAllAdmin,
  updateAdmin,
  adminSuspendTeacher,
  adminUnsuspendTeacher,
  adminWithdrawTeacher,
  adminUnwithdrawTeacher,
  adminPublishExam,
  adminUnpublishExam,
};
