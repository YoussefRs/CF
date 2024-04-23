function notFoundError(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
  });
}

module.exports = { notFoundError, errorHandler };
