const express = require('express');
const router = express.Router();

const { getUserByID, updateProfile, deleteAccount, updateUserImage, getUserCourses } = require('../controllers/profileController');
const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/authMiddleware');


router.get('/getUserDetails', auth, getUserByID)
router.put('/updateProfile', auth, updateProfile);
router.delete('/deleteProfile', auth, deleteAccount);
router.put('/updateDisplayPicture', auth, updateUserImage);
router.post('/', getUserCourses);


module.exports = router;