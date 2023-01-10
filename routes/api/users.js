const express = require('express');
const router = express.Router();
const validation = require('../../schemas/validation');
const { userValidationSchema } = require('../../schemas/validationSchema');
const { registerUser, loginUser, logoutUser } = require('../../controllers/usersControllers');

router.post('/register', validation(userValidationSchema), registerUser);
router.post('/login');
router.post('/logout');

module.exports = router;
