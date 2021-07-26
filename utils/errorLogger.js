let errorLogger = (err, req, res, next) => {
  if (err)
    res
      .status(err.status || 500)
      .send({ errorMessage: err.message, code: 400 });
  next();
};

module.exports = errorLogger;
