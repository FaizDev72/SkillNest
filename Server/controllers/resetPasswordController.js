const User = require('../models/User')
const crypto = require('crypto');
const bcrypt = require('bcrypt')

exports.resetPasswordToken = async (req, res) => {
    try {
        // Getting data from request body
        const { email } = req.body;

        // Validate Data
        if (!email) {
            return res.json({
                success: false,
                message: `Empty Fields`
            });
        }

        // Check if such user exists
        const user = await user.find(email);

        if (!user) {
            return res.json({
                success: false,
                message: `This Email: ${email} is not registered with us, Please enter a valid Email`
            });
        }

        // generate token
        const token = crypto.randomBytes(20).toString('hex')

        // storing token in the DB
        await User.findByIdAndUpdate(email, { token, resetPasswordExpires: Date.now() + 3600000, });

        // generate url
        let url = `http://localhost:3000/update-password/${token}`;

        // send mail
        const mailInfo = await sendMail(email, "Password Reset Link", `Your link for email verification is ${url}. Please click this url to reset your password`)

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully, Please Check Your Email To Continue Further',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong While Sending Reset Mail'
        })
    }

}

exports.resetPassword = async (req, res) => {
    try {
        // getting details
        const { token, password, confirm_password } = req.body;

        // validate
        if (!token || !password || !confirm_password) {
            return res.json({
                success: false,
                message: 'Empty Fields',
            });
        }

        if (password != confirm_password) {
            return res.json({
                success: false,
                message: 'Password And Confirm Password Does Not Match',
            });
        }

        // verify token and time validity
        const user = await User.findOne(token);
        if (!user) {
            return res.json({
                success: false,
                message: 'Token is Invalid',
            });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: 'Token is expired, Please Regenerate Your Token',
            });
        }

        // password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // update password 
        const updatedUser = await User.findOneAndUpdate(token, { password: hashedPassword }, { new: true });

        // return response
        return res.json({
            success: true,
            message: `Password Updated Successfully`
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error occurred while updating password`
        });
    }
}