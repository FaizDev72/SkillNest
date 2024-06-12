const User = require('../models/User')
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator')
const OTP = require('../models/OTP')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../utils/sendMail')
require('dotenv').config();
const bcrypt = require('bcrypt')

exports.sendOtp = async (req, res) => {
    try {
        // Getting data from request body
        const { email } = req.body;

        // Validating Data
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Empty email field'
            })
        }

        // Checking email id if exists in DB
        const isEmailExists = await User.findOne({ email });

        if (isEmailExists) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered.'
            })
        }

        // generate Otp
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })
        console.log(otp)

        otpList = await User.find({ otp })
        let flag = true;
        while (flag) {
            if (otpList.includes(otp)) {
                otp = otpGenerator.generate(6, {
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false
                })
            } else {
                flag = false;
            }
        }

        // Insert Otp in DB
        const otpDetails = await OTP.create({
            email,
            otp,
        })

        // console.log(otpDetails)

        // Return response 
        return res.status(200).json({
            success: true,
            message: "OTP send successfully",
            otp
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.signup = async (req, res) => {
    try {
        // Getting request data from body
        let { first_name, last_name, email, password, confirm_password, otp, phone_no, account_type } = req.body;
        console.log({ first_name, last_name, email, password, confirm_password, otp, phone_no, account_type })

        // Validating the Data
        if (!first_name || !last_name || !email || !password || !confirm_password || !otp || !phone_no) {
            return res.status(400).json({
                success: false,
                message: 'Empty Field'
            })
        }

        // Checking email id if exists in DB
        const isEmailExists = await User.findOne({ email });

        if (isEmailExists) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered.'
            })
        }

        // check pwd and conf pwd
        if (password != confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password do not match. Please try again',
            });
        }

        // Get lastest form db 
        const lastestOtp = await OTP.find({email}).sort({ created_at: -1 }).limit(1);
        console.log(lastestOtp)

        if (lastestOtp[0].otp != otp) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect Otp',
            })
        }

        // hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handling approved and image field
        const approved = account_type == 'instructor' ? false : true
        const image = `https://api.dicebear.com/8.x/initials/svg?seed=${first_name} ${last_name}`;

        // create user profile first
        const profile = await Profile.create({
            gender: null,
            image,
            DOB: null,
            profession: null,
            about: null
        })

        // Create user into db
        const updateUser = await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone_no,
            account_type,
            approved,
            profile: profile.id
        })

        // sending response
        return res.status(200).json({
            success: true,
            updateUser,
            message: 'User Registered Successfully',
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User Cannot be Registered, Please Try Again.'
        })
    }
}

exports.login = async (req, res) => {
    try {
        // Getting data from request body
        const { email, password } = req.body;

        // Validating Data
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Empty email field'
            })
        }

        // Checking email id if exists in DB
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered.'
            })
        }

        // compare password
        if (await bcrypt.compare(password, user.password)) {
            // create jwt token
            const payload = {
                email: user.email,
                id: user._id,
                account_type: user.account_type
            }

            const token = jwt.sign(payload, process.env.ENCRYPTING_KEY, { expiresIn: '2h' });
            // store token in db
            // await User.findByIdAndUpdate(user._id, { token }, { new: true });
            user.token = token;
            user.password = undefined;

            // create cookie
            options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            // return response
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        }



    } catch (error) {
        console.log(error);
        //Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
}

exports.changePassword = async (req, res) => {

    try {
        // Getting the fields
        const { old_password, new_password, confirm_password, id } = req.body;

        // Getting user details from DB
        const user = await User.findById(id);

        // Validating the fields
        if (!old_password || !new_password || !confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Empty field'
            })
        }

        // Verifying old password
        if (!(await bcrypt.compare(old_password, user.password))) {
            return res.status(401).json({
                success: false,
                message: 'The Password is Incorrect',
            })
        }

        // Checking if old password and new password are same
        if (old_password == new_password) {
            return res.status(401).json({
                success: false,
                message: 'Enter Some different Password',
            })
        }

        // Checking if new password and confirm passwords are same
        if (new_password != confirm_password) {
            return res.status(401).json({
                success: false,
                message: 'Password and confirm password doesnt match',
            })
        }

        // Hashing the password
        const hashedPassword = bcrypt.compare(new_password, 10)

        // updating the password in the DB
        const updatedUser = await User.findByIdAndUpdate({ password: hashedPassword }, { new: true });

        // sending mail
        const info = await sendMail(user.email, `Password Updated Successfully for ${updatedUser.firstName} ${updatedUser.lastName}`, passwordUpdated(
            updatedUser.email,
            updatedUser.firstName,
        ))

        // return response
        return res.status(200).json({
            success: true,
            message: 'Password Updated Successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error Occurred While Updating Password',
            error: error.message,
        });
    }

}