const verifyToken = require("../utils/verifyToken");

const isAuthenicated = (model) => {
  return async (req, res, next) => {
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1];
    const verifiedToken = verifyToken(token);
    if (verifiedToken) {
      await model.findById(verifiedToken.id).select("name email role");
      req.userAuth = verifiedToken;
      next();
    } else {
      const err = new Error("Token expired or invalid");
      next(err);
    }
  };
};

module.exports = { isAuthenicated };
