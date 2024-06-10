const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    course_name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    course_learning: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    tag: {
        type: [String],
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    student_enrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    course_content: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
        required: true
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }],
    rating_review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ReviewAndRating",
        required: true
    }],
});


module.exports = mongoose.model("Course", courseSchema);