const AppError = require('./../utils/appError');

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data : ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const sendError = (err, res) => {
  if (err.isOperational) {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.log(err);
    res.status(err.statusCode).json({
      status: err.status,
      message: 'Something went very wrong'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = error.message || err.message;
  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  sendError(error, res);
};
