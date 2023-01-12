const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const MyError = require('../helpers/myErrors');

const { SECRET_KEY } = process.env;

const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return next(new MyError('Email in use', 409));
    }

    const hashPassword = bscrypt.hashSync(password, bscrypt.genSaltSync(10));
    await User.create({ email, subscription, password: hashPassword });

    res.status(201).json({
      user: {
        email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new MyError('Email or password is wrong', 401));
    }

    const passwordCompare = await bscrypt.compare(password, user.password);

    if (!passwordCompare) {
      return next(new MyError('Email or password is wrong', 401));
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      token,
      user: {
        email,
        subscription: 'starter',
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserSubscription = async (req, res, next) => {
  try {
    const { subscription } = req.body;
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, { subscription }, { new: true });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
};
