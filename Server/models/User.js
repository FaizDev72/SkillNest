const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        phone_no: {
            type: Number,
            required: true,
            trim: true,
        },
        account_type: {
            type: String,
            enum: ["student", "admin", "instructor"],
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        approved: {
            type: Boolean,
            default: true
        },
        token: {
            type: String,
        },
        reset_pwd_expires: {
            type: Date
        },
        profile: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile"
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }],
        course_progress: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress"
        }],
    },
    { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);