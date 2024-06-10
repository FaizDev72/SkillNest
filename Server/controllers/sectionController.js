const Section = require("../models/Section");
const Course = require("../models/Course");

// Create Section
exports.createSection = async (req, res) => {
    try {
        // Fetching Data 
        const { section_name, course_id } = req.body;

        // Validating Data
        if (!section_name || !course_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        // create section
        const section = await Section.create(section_name)

        // update courses section field
        const course = await Course.findByIdAndUpdate({ _id: course_id }, {
            $push: { section: section._id }
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
            updatedCourseDetails,
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
        const { section_name, section_id } = req.body;

        // Validating Data
        if (!section_name || !section_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties'
            });
        }

        // update section
        const section = await Section.findByIdAndUpdate(section_id, section_name,
            { new: true },
        );

        return res.status(200).json({
            success: true,
            message: section,
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
        const section_id = req.section.id

        // Validating  Data
        if (!ection_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing Properties'
            });
        }

        // Delete
        await Section.findByIdAndDelete(section_id);

        return res.status(200).json({
            success: true,
            message: 'Section deleted successfully',
        })


    } catch (error) {

    }
}

