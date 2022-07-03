const { createError } = require("../helpers");

const validationUpdate = (schema) => {
  const func = (req, res, next) => {
    const isEmpty = Object.keys(req.body).length === 0;
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      return next(error);
    }
    if (isEmpty) {
      next(createError(400));
    }
    next();
  };

  return func;
};

module.exports = validationUpdate;
