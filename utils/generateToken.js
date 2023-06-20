const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SIGN, { expiresIn: "5d" });
};

module.exports = generateToken;
