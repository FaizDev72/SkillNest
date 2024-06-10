const User = require('../models/User')
const Course = require('../models/Course')
const { instance } = require('../config/razorPay');
const { sendMail } = require('../utils/sendMail');

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {

    // Getting data from request body
    const { course_id, user_id } = req.body;

    // validating Data
    if (!course_id) {
        return res.json({
            success: false,
            message: "Please Provide valid course ID",
        });
    }

    let course;
    try {
        course = await Course.findOne(course_id);

        if (!course) {
            return res.json({
                success: false,
                message: 'Could not find the course'
            });
        }

        // Check if user already enrolled in same course
        const uid = new mongoose.Type.ObjectId(user_id);

        if (course.student_enrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: 'Student is already enrolled',
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            successs: false,
            message: error.message,
        });
    }

    // create order
    const amount = course.price;
    const currency = 'INR';
    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            course_id,
            user_id,
        }
    }
    // initialte payment
    try {
        const paymentResponse = await instance.orders.create(options)

        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.course_name,
            courseDescription: course.course_desc,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Could not initiate order',
        });
    }
}

// verify signature
exports.verifySignature = async (req, res) => {
    // get data from razorpay request
    const signature = req.headers("x-razorpay-signature")
    const { course_id, user_id } = req.body.paylaod.payment.entity.notes;

    // create secret key
    const webHookSecret = '123456'

    // verify secret key
    const hash = crypto.createHmac("sha256", webHookSecret);
    hash.update(JSON.stringify(req.body));

    if (signature === hash) {
        try {
            const course = await Course.findByIdAndUpdate(
                course_id,
                {
                    $push:
                        { student_enrolled: user_id },
                },
                { new: true },
            )
            if (!course) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not Found',
                });
            }
            const user = await User.findByIdAndUpdate(
                user_id,
                {
                    $push:
                        { courses: course_id },
                },
                { new: true },
            )
            if (!user) {
                return res.status(500).json({
                    success: false,
                    message: 'User not Found',
                });
            }

            const mailRes = sendMail(user.email, "Congratulations from CodeHelp", "Congratulations, You are onboarded into new Codehelp course");

            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course added",
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } else {
        return res.status(400).json({
            success: false,
            message: 'Invalid Request',
        });
    }

    // update DB of course and user
    // return
}