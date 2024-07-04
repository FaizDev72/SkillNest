const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    DOB: {
        type: String
    },
    about: {
        type: String,
    },
    phone: {
        type: Number,
    }
    // For Future Scope
    // address: [
    //     {
    //         address_line: {
    //             type: String,
    //         },
    //         pincode: {
    //             type: Number,
    //         },
    //         city: {
    //             type: String,
    //         },
    //         State: {
    //             type: String,
    //         },
    //         country: {
    //             type: String,
    //         }
    //     }
    // ]

});


module.exports = mongoose.model("Profile", profileSchema);