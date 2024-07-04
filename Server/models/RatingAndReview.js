const mongoose = require("mongoose");
const ratingAndReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },

    review: {
        type: String,
        trim: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
    }

});


module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);