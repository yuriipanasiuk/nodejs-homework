const jwt = require('jsonwebtoken');
const bscrypt = require('bcryptjs');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs').promises;
const Jimp = require('jimp');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const MyError = require('../helpers/myErrors');

const { SECRET_KEY } = process.env;

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

const avatarDir = path.join(process.cwd(), 'public', 'avatars');

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  const imageName = `${uuidv4()}_${originalname}`;

  try {
    const resultUpload = path.join(avatarDir, imageName);

    Jimp.read(tempUpload, (err, image) => {
      if (err) next(err);
      image.resize(250, 250).write(resultUpload);
    });

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('public', 'avatars', imageName);
    await User.findByIdAndUpdate(id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(path);
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
