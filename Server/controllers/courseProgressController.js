const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async (req, res) => {
    try {
        // get data from response
        const { course_id, sub_section_id } = req.body;
        const user_id = req.user.id;

        // get subsection
        const subSection = await SubSection.findById(sub_section_id);

        // validate
        if (!subSection) {
            return res.status(404).json({ error: "Invalid subsection" })
        }

        // get courseprogress
        const courseProgress = await CourseProgress.findOne({ course_id, user_id });

        // validate
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // check subsction id already exists
            if (courseProgress.completed_videos.includes(sub_section_id)) {
                return res.status(400).json({ error: "Subsection already completed" })
            }

            // if not push section id to courseprogress
            courseProgress.completed_videos.push(sub_section_id);
        }

        // save
        await courseProgress.save();

        // return
        return res.status(200).json({ message: "Course progress updated" })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}