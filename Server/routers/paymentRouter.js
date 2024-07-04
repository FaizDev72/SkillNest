const express = require('express');
const router = express.Router();

const { auth, isStudent } = require('../middlewares/authMiddleware');
const { capturePayment, verifySignature, paymentSuccessEmail } = require('../controllers/payment');


router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifySignature', auth, isStudent, verifySignature);
router.post('/paymentSuccessEmail', auth, isStudent, paymentSuccessEmail);

module.exports = router;