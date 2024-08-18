const ErrorHandler = require("../utils/errorhandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal servar error";

  // invaild mogo db id 
  if(err.name == "CastError"){
    const massage = "resouce not found due to invalid path";

    err = new ErrorHandler(massage,400)
  }
 
  res.json({
    code: err.statusCode,
    success: false,
    error: err.message,
  });
};
