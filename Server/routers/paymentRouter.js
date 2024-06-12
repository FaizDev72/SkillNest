const express = require('express');
const router = express.Router();

const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/authMiddleware');
const { capturePayment, verifySignature } = require('../controllers/payment');


router.post('/capturePayment', auth, isStudent, capturePayment);
router.post('/verifySignature', verifySignature);

module.exports = router;