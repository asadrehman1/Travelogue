const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB id

  if(err.name === "CastError") {
    const message = `Resource Not Found. Invalid ${err.path}`;
    err = new ErrorHandler(message,404);
  }

  // Mongoose Duplicate key error

  if(err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message,404);
  }

  // JWT Token error

  if(err.name === "JsonWebTokenError"){
    const message = `Json Web Token is invalid. Please try again.`;
    err = new ErrorHandler(message,404);
  }

  // JWT Token expire error

  if(err.name === "TokenExpiredError"){
    const message = `Json Web Token is Expired. Please try again.`;
    err = new ErrorHandler(message,404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};