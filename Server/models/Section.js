const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    section_name: {
        type: String,
        required: true,
        trim: true,
    },
    sub_section: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection",
        required: true
    }]
});


module.exports = mongoose.model("Section", sectionSchema);