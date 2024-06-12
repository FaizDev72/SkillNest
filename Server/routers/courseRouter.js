const express = require('express');
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/authMiddleware');
const { createCourse, getAllCourses, getCourseById } = require('../controllers/courseController');
const { createSection, updateSection, deleteSection } = require('../controllers/sectionController');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSectionController');
const { createRating, getAverageRating, getAllRatingReview } = require('../controllers/ratingReviewController');
const { createCategory, getAllCategory, getPageDetails } = require('../controllers/categoryController');



//*************************************************************************************
//                  Course Routes
//*************************************************************************************

// Get details of all courses
router.get('/getAllCourses', getAllCourses)

// Create course router
router.post('/createCourse', auth, isInstructor, createCourse);
router.post('/getCourseDetails', getCourseById)

// Section
router.post('/addSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.post('/deleteSection', auth, isInstructor, deleteSection);

// Sub - Section
router.post('/addSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


//*****************************************************************************
//              Rating And Review
//*****************************************************************************
router.post('/createRating', auth, isStudent, createRating);
router.post('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingReview);


//***********************************************************************
//              Category Routes (Only By Admin)
//***********************************************************************
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', getAllCategory);
router.post('/getCategoryPageDetails', getPageDetails);


module.exports = router;