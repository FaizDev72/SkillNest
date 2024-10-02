const mongoose = require('mongoose');
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const inProduction = require('../utils/logger');

// create Rating
exports.createRating = async (req, res) => {
    try {
        // Fetch data
        const { rating, review, course_id } = req.body;
        const user_id = req.user.id;

        // Validate data
        if (!rating || !review || !user_id || !course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        // Check if user is enrolled in the course
        const courseDetails = await Course.findOne({
            _id: course_id,
            student_enrolled: { $elemMatch: { $eq: user_id } }
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }

        // Check if user has already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user_id,
            course_id,
        });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }

        // Create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user_id,
            course_id,
        });

        // Add review id to course's rating_review array
        await Course.findByIdAndUpdate(
            course_id,
            {
                $push: { rating_review: ratingReview._id }
            },
            { new: true }
        );

        // Save course details
        await courseDetails.save();

        // Return response
        return res.status(201).json({
            success: true,
            message: 'Rating and review created successfully',
            ratingReview,
        });

    } catch (error) {
        if (!inProduction()) {
        console.log(error);
        }
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


exports.getAverageRating = async (req, res) => {
    try {
        const { course_id } = req.body;

        // Step 1: Check with a simple find query
        const findResult = await RatingAndReview.find({ course_id: new mongoose.Types.ObjectId(course_id) });

        // Step 2: If documents exist, perform the aggregation
        if (findResult.length > 0) {
            const result = await RatingAndReview.aggregate([
                {
                    $match: {
                        course_id: new mongoose.Types.ObjectId(course_id)
                    },
                },
                {
                    $group: {
                        _id: null,
                        averageRating: { $avg: "$rating" },
                    }
                }
            ]);

            // Log the aggregation result

            // Return the average rating
            if (result.length > 0) {
                return res.status(200).json({
                    success: true,
                    averageRating: result[0].averageRating,
                });
            }
        }

        // If no rating/review exists or find result is empty
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no rating given till now',
            averageRating: 0,
        });

    } catch (error) {
        if (!inProduction()) {
        console.log(error);
        }
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// get all rating and review
exports.getAllRatingReview = async (req, res) => {
    try {
        const allRatingReview = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user_id",
                select: "first_name, last_name, email",
                populate: {
                    path: "profile",
                    select: "image",
                }
            }).populate({
                path: "course_id",
                select: "course_name",
            }).exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allRatingReview,
        });
    } catch (error) {
        if (!inProduction()) {
        console.log(error);
        }
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
