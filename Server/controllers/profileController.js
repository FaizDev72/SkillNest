const Profile = require("../models/Profile");
const User = require("../models/User");
const { destoryImageFromCloudinary, uploadImagetoCloudinary } = require("../utils/cloudinaryAssetsHandlers");

// update profile
exports.updateProfile = async (req, res) => {
    try {
        // getting data from request body
        const { DOB = '', about = '', gender = '', profession = '', user_id } = req.body;

        // get user
        const userDetails = await User.findById(user_id);

        // update
        const updatedProfile = await Profile.findByIdAndUpdate(
            { _id: userDetails.profile },
            { DOB, about, gender, profession },
            { new: true },
        )

        // return
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            profile,
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
        const userDetails = await User.find(user_id);

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
        const  user_id  = req.user.id;
        const image = req.files.imageFile;
        console.log(user_id)
        console.log(req.body)

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

        // return
        res.send({
            success: true,
            message: `Image Updated Successfully`,
            data: updatedProfile,
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
exports.getUserCourses = async (req, res) => {
    try {
        const { user_id } = req.body;
        const userDetails = await User.findById(user_id).populate("courses").exec();
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