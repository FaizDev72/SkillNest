const Category = require("../models/Category");
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const { uploadImagetoCloudinary } = require("../utils/cloudinaryAssetsHandlers");
const { convertSecondsToDuration } = require("../utils/secToDuration");


// Create Courses
exports.createCourse = async (req, res) => {
    try {
        // Fetching Data
        console.log(req)
        let { course_name, description, price, course_learning, tag: _tag, category, instructions: _instructions, status } = req.body;
        const instructor = req.user.id;

        const thumbnail = req.files.thumbnail

        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        console.log({ course_name, instructor, description, price, course_learning, tag, category, thumbnail, instructions })

        // Validate
        if (!course_name || !instructor || !description || !price || !course_learning || !tag || !category || !instructions) {
            return res.status(400).json({
                success: false,
                message: 'All Fields are mandatory',
            });
        }

        // Upload Image to Cloudinary
        const thumbnailUrl = await uploadImagetoCloudinary(thumbnail, process.env.CLOUD_FOLDER);

        // Insert Data
        const newCourse = await Course.create({
            course_name,
            description,
            price,
            course_learning,
            thumbnail: thumbnailUrl.secure_url,
            tag,
            instructor,
            category,
            instructions
        });

        // Fetch the newly created course and populate the category field
        const course = await Course.findById(newCourse._id).populate('category');

        // adding new course to user schema
        await User.findByIdAndUpdate(
            { _id: instructor },
            { $push: { courses: course.id } },
            { new: true }
        );

        // Updating category
        await Category.findByIdAndUpdate(
            { _id: category },
            { $push: { courses: course.id } },
            { new: true }
        );

        //Return the new course and a success message
        res.status(200).json({
            success: true,
            data: course,
            message: "Course Created Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to Create Course',
            error: error.message,
        });
    }
}

// getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}, {
            course_name: true,
            price: true,
            thumbnail: true,
            instructor: true,
            rating_review: true,
            student_enrolled: true,
        }).populate("instructor").exec();
        return res.status(200).json({
            success: true,
            message: 'Data for all Courses Fetched Successfully',
            data: courses,
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: `Cannot Fetch Course Data`,
            error: error.message,
        });
    }
};

// Get Course By Id
exports.getCourseById = async (req, res) => {

    try {
        const { course_id } = req.body
        console.log(course_id)

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        const course = await Course.findById(course_id)
            .populate({
                path: "instructor",
                populate: {
                    path: "profile"
                }
            })
            .populate("category")
            .populate("rating_review")
            .populate("course_content")
            .populate({
                path: "course_content",
                populate: {
                    path: "sub_section",
                    select: "-video",
                },
            })
            .exec();

        if (!course) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${course_id}`,
            });
        }

        let totalDurationInSeconds = 0;

        course.course_content.map((sec) => {
            sec.sub_section.map((subSec) => {
                const timeDurationInSeconds = parseInt(subSec.duration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        let totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data: { course, totalDuration },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}

exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructor_id = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructor_id,
        }).sort({ createdAt: -1 })

        // Return the instructor's courses
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const { course_id } = req.body;
        // console.log("loging body=>> ", req.body);

        let course = await Course.findById(course_id)
        let updates = req.body;

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            })
        }

        if (req.files) {
            console.log("Need to update Thumnail Image")
            const image = req.files.thumbnail
            const newImage = await uploadImagetoCloudinary(image, process.env.CLOUD_FOLDER)
            course.thumbnail = newImage.secure_url;
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === 'instructions' || key === 'tag') {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key];
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({ _id: course_id })
            .populate({
                path: "instructor",
                populate: {
                    path: "profile"
                }
            })
            .populate("category")
            .populate("rating_review")
            .populate({
                path: "course_content",
                populate: {
                    path: "sub_section"
                }
            }).exec();

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }

}

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { course_id } = req.body;
        const user_id = req.user.id;
        console.log(course_id, user_id)
        const courseDetails = await Course.findById(course_id)
            .populate({
                path: "instructor",
                populate: {
                    path: "profile"
                }
            })
            .populate("category")
            .populate("rating_review")
            .populate("course_content")
            .populate({
                path: "course_content",
                populate: {
                    path: "sub_section",
                },
            })
            .exec();

        let courseProgressCount = await CourseProgress.findOne({ course_id, user_id })

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${course_id}`,
            })
        }

        let totalDurationInSeconds = 0;

        courseDetails.course_content.forEach((section) => {
            section.sub_section.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.duration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completed_videos
                    ? courseProgressCount?.completed_videos
                    : [],
            },
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { course_id } = req.body;
        console.log(course_id)

        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        // Unenroll students from course
        const studentsEnrolled = course.student_enrolled
        for (const user_id of studentsEnrolled) {
            await User.findByIdAndUpdate(user_id, { $pull: { courses: course_id } })
        }

        // Delete Sections and Sub Sections
        for (const section_id of course.course_content) {
            const section = await Section.findById(section_id)
            if (section) {
                for (const sub_section_id of section.sub_section) {
                    await SubSection.findByIdAndDelete(sub_section_id)
                }
            }
            // Delete Section
            await Section.findByIdAndDelete(section_id)
        }

        await Course.findByIdAndDelete(course_id);
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}