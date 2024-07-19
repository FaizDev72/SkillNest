const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImagetoCloudinary, destoryImageFromCloudinary } = require("../utils/cloudinaryAssetsHandlers");
require('dotenv').config();

// Create Sub Section
exports.createSubSection = async (req, res) => {
    try {
        // Fetching Data 
        const { sub_section_name, section_id, sub_section_desc } = req.body;
        const video = req.files.videoFile;


        // console.log(req)
        // console.log(sub_section_name, section_id, sub_section_desc, video)
        // Validating Data
        if (!sub_section_name || !section_id || !sub_section_desc || !video) {
            return res.status(400).json({
                success: false,
                message: 'Missing required properties'
            });
        }

        if (! await Section.findById(section_id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Section Id'
            });
        }

        // Upload video cloudinary
        const videoUrl = await uploadImagetoCloudinary(video, process.env.FOLDER_NAME)

        // create section
        const subSection = await SubSection.create({
            sub_section_name,
            sub_section_desc,
            duration: `${videoUrl.duration}`,
            video: videoUrl.secure_url,
        })

        // update sections subsection field
        const updatedSection = await Section.findByIdAndUpdate({ _id: section_id }, {
            $push: { sub_section: subSection._id }
        }, { new: true }).populate("sub_section")

        //return updated section object in response
        return res.status(200).json({
            success: true,
            message: 'Sub Section Created Successfully',
            data: updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message,
        })
    }
}

// Update Sub Section
exports.updateSubSection = async (req, res) => {
    try {
        // Getting data from requesting
        const { sub_section_name, sub_section_id, sub_section_desc, section_id } = req.body;
        // console.log(sub_section_name, sub_section_id, sub_section_desc, section_id)

        // Retreiving Sub-Section
        const subSection = await SubSection.findById(sub_section_id)

        // Validating Data
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "Missing Fields",
            })
        }

        // check which value is changed
        if (sub_section_name !== undefined) {
            subSection.sub_section_name = sub_section_name;
        }

        if (sub_section_desc !== undefined) {
            subSection.sub_section_desc = sub_section_desc;
        }

        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile;

            // if video has been changed than first delete the preview video from cloudinary &
            console.log("Preview Url ->>", subSection.video)
            await destoryImageFromCloudinary(subSection.video);

            // upload the new video 
            const newVideo = await uploadImagetoCloudinary(video, process.env.CLOUD_FOLDER, 1000)
            console.log("New Url ->>", newVideo.secure_url)
            subSection.video = newVideo.secure_url;
            subSection.duration = `${newVideo.duration}`
        }

        // save the changes
        await subSection.save();

        // find updated section and return it
        const updatedSection = await Section.findById(section_id).populate(
            "sub_section"
        )

        console.log("updated section", updatedSection)

        // return the updated section
        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to Update Sub-Section, please try again',
            error: error.message,
        })
    }
}

// Delete Sub Section
exports.deleteSubSection = async (req, res) => {
    try {
        // fetching data
        const { sub_section_id, section_id } = req.body

        // find and delete entries from section 
        await Section.findByIdAndUpdate(section_id,
            { $pull: { sub_section: sub_section_id } },
        )

        // delete sub section
        await SubSection.findByIdAndDelete(sub_section_id)

        const updatedSection = await Section.findById(section_id).populate("sub_section");

        // return section
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: 'Sub Section deleted successfully',
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An Error Occurred While Deleting the SubSection",
        })
    }
}

