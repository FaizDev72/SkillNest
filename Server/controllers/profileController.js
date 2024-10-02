const CourseProgress = require("../models/CourseProgress");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const User = require("../models/User");
const { destoryImageFromCloudinary, uploadImagetoCloudinary } = require("../utils/cloudinaryAssetsHandlers");
const { convertSecondsToDuration } = require("../utils/secToDuration")

// update profile
exports.updateProfile = async (req, res) => {
    try {
        const {
            first_name = "",
            last_name = "",
            about = "",
            phone = "",
            DOB = "",
            gender = ""
        } = req.body;

        const user_id = req.user.id;

        // update firstname lastname
        let user = await User.findByIdAndUpdate(user_id, { first_name, last_name }, { new: true });

        // update profile info
        let profile = await Profile.findByIdAndUpdate(user.profile, { about, phone, DOB, gender }, { new: true })

        // fetch latest user
        const updatedUserDetails = await User.findById(user_id).populate("profile").exec();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedUserDetails,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error in Updating Profile',
            error: error.message,
        });
    }
}

// delete Account
exports.deleteAccount = async (req, res) => {
    try {
        // Get data from body
        const user_id = req.user.id;

        // Check if user exists & validate
        const userDetails = await User.findById(user_id);

        if (!userDetails) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found',
            });
        }

        // delete user profile
        await Profile.findByIdAndDelete(userDetails.profile)

        // delete user
        await User.findByIdAndDelete(user_id)

        // return
        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });

    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message: 'User Cannot Be Deleted',
                error: error.message,
            });
    }
}

// getAll user
exports.getUserByID = async (req, res) => {
    try {
        const user_id = req.user.id;
        console.log(user_id)
        const userDetails = await User.findById(user_id).populate("profile").populate("courses").exec();
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            data: userDetails,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// update user profile picture
exports.updateUserImage = async (req, res) => {
    try {
        // Getting user details
        const user_id = req.user.id;
        const image = req.files.displayPicture;
        console.log(user_id)
        console.log(image)

        // Fetching User data and Validating
        const user = await User.findById(user_id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `Could Not Find User`,
            });
        }

        // delete user current image from cloudinary
        await destoryImageFromCloudinary(user.image);

        // Upload image to cloudinary
        const newImageUrl = await uploadImagetoCloudinary(image, process.env.CLOUD_FOLDER, 1000)

        //Update image of user in profile schema
        const updatedProfile = await Profile.findByIdAndUpdate(user.profile, { image: newImageUrl.secure_url }, { new: true });
        const userData = await User.findById(user_id).populate("profile");

        // return
        res.send({
            success: true,
            message: `Image Updated Successfully`,
            data: userData,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get courses of user
exports.getEnrolledCourses = async (req, res) => {
    try {
        const user_id = req.user.id;
        let userDetails = await User.findById(user_id).
            populate({
                path: "courses",
                populate: {
                    path: "course_content",
                    populate: {
                        path: "sub_section"
                    }
                }
            })
            .exec();

        userDetails = userDetails.toObject();
        var sub_section_length = 0;
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            sub_section_length = 0;
            for (var j = 0; j < userDetails.courses[i].course_content.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].course_content[j].sub_section.reduce((acc, curr) => acc + parseInt(curr.duration), 0)
                userDetails.courses[i].total_duration = convertSecondsToDuration(totalDurationInSeconds)
                sub_section_length += userDetails.courses[i].course_content[j].sub_section.length;
            }
            let course_id = userDetails.courses[i]._id
            let courseProgressCount = await CourseProgress.findOne({
                course_id,
                user_id,
            })

            courseProgressCount = courseProgressCount?.completed_videos.length;

            if (sub_section_length === 0) {
                userDetails.courses[i].progress_percentage = 100;
                userDetails.courses[i].total_duration = 0;

            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progress_percentage = Math.round((courseProgressCount / sub_section_length) * 100 * multiplier) / multiplier;
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could Not Find User With Id: ${userDetails}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.student_enrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDetailsStats = {
                _id: course._id,
                course_name: course.course_name,
                course_description: course.description,
                totalStudentsEnrolled,
                totalAmountGenerated
            }

            return courseDetailsStats;
        })

        res.status(200).json({ courses: courseData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            error: error.message,
            message: "Server Error" })
      }
    }