const jwt = require('jsonwebtoken');
const bscrypt = require('bcryptjs');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs').promises;

const User = require('../models/user');
const MyError = require('../helpers/myErrors');

const { SECRET_KEY } = process.env;

const storageImage = path.join(process.cwd(), 'public', 'avatars');

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(new MyError('Email in use', 409));
    }

    const avatarURL = gravatar.url(email);

    await User.create({
      email,
      password,
      avatarURL,
    });

    const { subscription } = await User.findOne({ email });

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
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

    const { subscription } = user;

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;

  try {
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
  const { _id } = req.user;

  try {
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    const { email, subscription } = result;

    res.json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  try {
    const resultUpload = path.join(storageImage, `${id}_${originalname}`);

    fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('public', 'avatar', originalname);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateAvatar,
};

//TODO: resize avatar by using jimp
