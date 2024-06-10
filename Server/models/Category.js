const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true,
        trim: true,
    },    
    category_desc : {
        type: String,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }],

});


module.exports = mongoose.model("Category", categorySchema);