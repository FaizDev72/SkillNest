const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    completed_videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true
    }]

});


module.exports = mongoose.model("CourseProgress", courseProgressSchema);