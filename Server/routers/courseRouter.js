const express = require('express');
const router = express.Router();
const { auth, isInstructor, isStudent, isAdmin } = require('../middlewares/authMiddleware');
const { createCourse, getAllCourses, getCourseById, getInstructorCourses, updateCourse, getFullCourseDetails, deleteCourse } = require('../controllers/courseController');
const { createSection, updateSection, deleteSection } = require('../controllers/sectionController');
const { createSubSection, updateSubSection, deleteSubSection } = require('../controllers/subSectionController');
const { createRating, getAverageRating, getAllRatingReview } = require('../controllers/ratingReviewController');
const { createCategory, getAllCategory, getPageDetails } = require('../controllers/categoryController');
const { updateCourseProgress } = require('../controllers/courseProgressController');


//*************************************************************************************
//                  Course Routes
//*************************************************************************************

// Get details of all courses
router.get('/getAllCourses', getAllCourses)

// Create course router
router.post('/createCourse', auth, isInstructor, createCourse);
router.post('/getCourseDetails', getCourseById)
router.post('/updateCourse', updateCourse)
router.post('/getFullCourseDetails', auth, getFullCourseDetails)
router.delete('/deleteCourse', auth, isInstructor, deleteCourse)

// Section
router.post('/createSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.post('/deleteSection', auth, isInstructor, deleteSection);

// Sub - Section
router.post('/createSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


//*****************************************************************************
//              Rating And Review
//*****************************************************************************
router.post('/createRating', auth, isStudent, createRating);
router.post('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingReview);


//***********************************************************************
//              Rating Review Routes (Only By Admin)
//***********************************************************************
router.get('/getAllRatingReview', getAllRatingReview);
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses);


//***********************************************************************
//              Category Routes (Only By Admin)
//***********************************************************************
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', getAllCategory);
router.post('/getCategoryPageDetails', getPageDetails);

//***********************************************************************
//                       Course Progress
//***********************************************************************
router.post('/updateCourseProgress', auth, isStudent, updateCourseProgress)

module.exports = router;