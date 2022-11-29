const { validationResult } = require('express-validator');

module.exports = (req, _, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    const error = new Error();
    error.message = msg;
    error.status = 400;
    return next(error)
  }
  next();
};
