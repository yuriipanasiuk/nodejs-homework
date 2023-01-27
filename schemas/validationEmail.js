const MyError = require('../helpers/myErrors');

const validationEmail = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new MyError('missing required field email', 400));
    }
    next();
  };
};

module.exports = validationEmail;
