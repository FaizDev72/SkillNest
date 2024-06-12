const Category = require("../models/Category");
const Course = require("../models/Course");
const User = require("../models/User");
const { uploadImagetoCloudinary } = require("../utils/cloudinaryAssetsHandlers");


// Create Courses
exports.createCourse = async (req, res) => {
    try {
        // Fetching Data
        const { course_name, description, price, course_learning, tag, category } = req.body;
        const instructor = req.user.id;

        const thumbnail = req.files.thumbnail
        console.log({ course_name, instructor, description, price, course_learning, tag, category, thumbnail })

        // Validate
        if (!course_name || !instructor || !description || !price || !course_learning || !tag || !category) {
            res.status(400).json({
                success: false,
                message: 'All Filds are mandatory',
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
            category
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

exports.getCourseById = async (req, res) => {

    try {
        const { course_id } = req.body

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        const course = await Course.findById(course_id).populate({
            path: "instructor",
            populate: {
                path: "profile"
            },
        }).exec();

        if (!course) {
            return res.status(400).json({
                success: false,
                message: `Could not find the course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data: course,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


}