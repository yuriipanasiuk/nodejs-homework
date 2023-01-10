const User = require('../models/user');
// const myError = require('../helpers/myErrors');

const registerUser = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      res.status(409).json({
        message: 'Email in use',
      });
    }

    await User.create({ email, password, subscription });

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

const loginUser = async (req, res) => {};
const logoutUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
