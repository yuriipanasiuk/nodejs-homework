const MyError = require('../myErrors');

const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new MyError('missing required name field', 400));
    }
    next();
  };
};

module.exports = validation;
