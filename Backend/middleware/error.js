const ErrorHandler = require("../utils/errorhandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal servar error";

 
  res.json({
    code: err.statusCode,
    success: false,
    error: err.message,
  });
};
