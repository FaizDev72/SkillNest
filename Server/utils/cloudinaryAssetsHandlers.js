const cloudinary = require('cloudinary').v2

exports.uploadImagetoCloudinary = async (file, folder, height, quality) => {
    const options = { folder };

    if (height) {
        options.height = height
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.destoryImageFromCloudinary = async (public_id) => {
    try {
        const options = {
            resource_type: "auto",
        }
        const result = await cloudinary.uploader.destroy(public_id, options);
    } catch (error) {
        console.error('Error destroying asset:', error);
    }
}