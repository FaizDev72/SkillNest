const mongoose = require('mongoose');
const { sendMail } = require('../utils/sendMail');

const OTPSchema = new mongoose.Schema({
    otp: {
        type: Number,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        expires: 60 * 5,
    },
    email: {
        type: String,
        required: true
    }
})


OTPSchema.pre("save", async function (next) {
    await sendMail(this.email, "Otp verification mail", this.otp)
})


module.exports = mongoose.model("OTP", OTPSchema);