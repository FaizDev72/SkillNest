const User = require('../models/User')
const Profile = require('../models/Profile')
const otpGenerator = require('otp-generator')
const OTP = require('../models/OTP')
const jwt = require('jsonwebtoken')
const { sendMail } = require('../utils/sendMail')
require('dotenv').config();
const bcrypt = require('bcrypt')
const { passwordUpdated } = require('../mail/templates/passwordUpdate')

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
        let { first_name, last_name, email, password, confirm_password, otp, account_type } = req.body;
        console.log({ first_name, last_name, email, password, confirm_password, otp, account_type })

        // Validating the Data
        if (!first_name || !last_name || !email || !password || !confirm_password || !otp) {
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
        const lastestOtp = await OTP.find({ email }).sort({ created_at: -1 }).limit(1);
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
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Empty email field'
            })
        }

        // Checking email id if exists in DB
        const user = await User.findOne({ email }).populate("profile");

        if (!user) {
            return res.status(409).json({
                success: false,
                message: 'User is not registered.'
            })
        }

        // compare password
        if (await bcrypt.compare(password, user.password)) {
            console.log(user)
            // create jwt token
            const payload = {
                email: user.email,
                id: user._id,
                account_type: user.account_type
            }

            const token = jwt.sign(payload, process.env.ENCRYPTING_KEY, { expiresIn: '24h' });
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
            console.log({ email, password })
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            })
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
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
        const { current_password, new_password, confirm_password } = req.body;
        const user_id = req.user.id;
        // Getting user details from DB
        const user = await User.findById(user_id);

        // Validating the fields
        if (!current_password || !new_password || !confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Empty field'
            })
        }

        // Verifying old password
        if (await bcrypt.compare(current_password, user.password)) {
            // Checking if old password and new password are same
            if (current_password == new_password) {
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
            const hashedPassword = await bcrypt.hash(new_password, 10)

            // updating the password in the DB
            const updatedUser = await User.findByIdAndUpdate(user_id, { password: hashedPassword }, { new: true });

            // sending mail
            const info = await sendMail(user.email, `Password Updated Successfully for ${updatedUser.first_name} ${updatedUser.last_name}`, passwordUpdated(
                updatedUser.email,
                updatedUser.first_name,
            ))

            // return response
            return res.status(200).json({
                success: true,
                message: 'Password Updated Successfully'
            });
        }
        return res.status(401).json({
            success: false,
            message: 'The Password is Incorrect',
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error Occurred While Updating Password',
            error: error.message,
        });
    }

}