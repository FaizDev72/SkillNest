const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    sub_section_name: {
        type: String,
        required: true,
        trim: true,
    },
    sub_section_desc: {
        type: String,
        required: true,
        trim: true,
    },
    video: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model("SubSection", subSectionSchema);