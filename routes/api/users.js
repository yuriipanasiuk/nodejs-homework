const express = require('express');
const router = express.Router();

const validation = require('../../schemas/validation');
const validationEmail = require('../../schemas/validationEmail');
const {
  userValidationSchema,
  subscriptionUserValidationSchema,
  userEmailValidation,
} = require('../../schemas/validationSchema');
const auth = require('../../middlewares/auth');
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
  updateAvatar,
  verifyEmail,
  resendingEmail,
} = require('../../controllers/usersControllers');
const upload = require('../../middlewares/upload');

router.post('/register', validation(userValidationSchema), registerUser);
router.post('/login', validation(userValidationSchema), loginUser);
router.post('/logout', auth, logoutUser);
router.get('/current', auth, getCurrentUser);
router.patch('/', auth, validation(subscriptionUserValidationSchema), updateUserSubscription);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', verifyEmail);
router.post('/verify', validationEmail(userEmailValidation), resendingEmail);

module.exports = router;
