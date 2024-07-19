const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

// Create Section
exports.createSection = async (req, res) => {
    try {
        // Fetching Data 
        const { section_name, course_id } = req.body;
        console.log({ section_name, course_id })

        // Validating Data
        if (!section_name || !course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        // create section
        const section = await Section.create({ section_name })

        // update courses section field
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: course_id }, {
            $push: { course_content: section._id }
        }, { new: true }).populate({
            path: "course_content",
            populate: {
                path: "sub_section"
            }
        })

        //return updated course object in response
        return res.status(200).json({
            success: true,
            message: 'Section Created Successfully',
            data: updatedCourseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// Update Section
exports.updateSection = async (req, res) => {
    try {
        // Getting data from requesting
        const { section_name, section_id, course_id } = req.body;
        console.log(section_name, section_id)

        // Validating Data
        if (!section_name || !section_id || !course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties'
            });
        }

        // update section
        const section = await Section.findByIdAndUpdate(section_id, { section_name },
            { new: true },
        );

        const courseDetails = await Course.findById(course_id)
            .populate({
                path: "course_content",
                populate: {
                    path: "sub_section"
                }
            })

        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: courseDetails
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to Update Section, please try again',
            error: error.message,
        })
    }
}

// Delete Section
exports.deleteSection = async (req, res) => {
    try {
        const { section_id, course_id } = req.body;

        // Remove section reference from course content
        await Course.findByIdAndUpdate(course_id, { $pull: { course_content: section_id } });

        // Find section and get sub section ids
        let section = await Section.findById(section_id);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // Delete sub sections
        await SubSection.deleteMany({ _id: { $in: section.sub_section } });

        // Delete section
        await Section.findByIdAndDelete(section_id);

        // Get the updated course
        const updatedCourse = await Course.findById(course_id).populate({
            path: "course_content",
            populate: {
                path: "sub_section",
            },
        }).exec();

        // Return updated course
        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
            data: updatedCourse,
        });

    } catch (error) {
        console.log("Error while deleting section", error);
        return res.status(500).json({
            success: false,
            message: 'Unable to delete Section, please try again',
            error: error.message,
        });
    }
};


