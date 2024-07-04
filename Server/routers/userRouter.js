const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/authMiddleware');
const { sendOtp, signup, login, changePassword } = require('../controllers/authController');
const { resetPasswordToken, resetPassword } = require('../controllers/resetPasswordController');


// Authentication Routers
router.post('/sendotp', sendOtp);
router.post('/signup', signup);
router.post('/login', login);
router.post('/changepassword', auth, changePassword);


// Password reset
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);

module.exports = router;