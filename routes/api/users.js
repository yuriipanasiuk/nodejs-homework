const express = require('express');
const router = express.Router();

const validation = require('../../schemas/validation');
const { userValidationSchema } = require('../../schemas/validationSchema');
const auth = require('../../middlewares/auth');
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserSubscription,
} = require('../../controllers/usersControllers');

router.post('/register', validation(userValidationSchema), registerUser);
router.post('/login', validation(userValidationSchema), loginUser);
router.post('/logout', auth, validation(userValidationSchema), logoutUser);
router.get('/current', auth, getCurrentUser);
router.patch('/', auth, updateUserSubscription);

module.exports = router;
