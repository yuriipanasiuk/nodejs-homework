const jwt = require('jsonwebtoken');

const User = require('../models/user');
const MyError = require('../helpers/myErrors');
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
      return next(new MyError('Not authorized', 401));
    }

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token) {
      return next(new MyError('Not authorized', 401));
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      return next(new MyError('Not authorized', 401));
    }

    next(error);
  }
};

module.exports = auth;
