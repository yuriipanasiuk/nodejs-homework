const express = require('express');
const router = express.Router();

const validation = require('../../schemas/validation');
const {
  userValidationSchema,
  subscriptionUserValidationSchema,
} = require('../../schemas/validationSchema');
const auth = require('../../middlewares/auth');
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateAvatar,
} = require('../../controllers/usersControllers');
const upload = require('../../middlewares/upload');

router.post('/register', validation(userValidationSchema), registerUser);
router.post('/login', validation(userValidationSchema), loginUser);
router.post('/logout', auth, logoutUser);
router.get('/current', auth, getCurrentUser);
router.patch('/', auth, validation(subscriptionUserValidationSchema), updateUserSubscription);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);

module.exports = router;
