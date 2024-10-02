const User = require('../models/User')
const Course = require('../models/Course')
const CourseProgress = require('../models/CourseProgress')
const crypto = require("crypto")
const { instance } = require('../config/razorPay');
const { sendMail } = require('../utils/sendMail');
const { mongoose } = require('mongoose');
const { courseEnrollment } = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmailTmp } = require("../mail/templates/paymentSuccessEmail");
const inProduction = require('../utils/logger');
require('dotenv').config();

// Capture Payments
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const user_id = req.user.id;
    if (!courses || !user_id) {
        return res.json({
            success: false,
            message: "Empty Fields"
        })
    }

    if (courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
    }

    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id)
            if (!course) {
                return res.json({
                    success: false,
                    message: "Invalid Course Id",
                })
            }

            const uid = new mongoose.Types.ObjectId(user_id);
            if (course.student_enrolled.includes(uid)) {
                return res.status(200).json({
                    success: false, message: "Student is already Enrolled"
                })
            }

            totalAmount += course.price;
        } catch (error) {
            if (!inProduction()) {
            console.log(error)
            }
            return res.status(500).json({
                success: false, message: error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }


    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        if (!inProduction()) {
        console.log(error)
        }
        res.status(500).json({
            success: false, message: "Could not initiate order."
        })
    }
}

// Verify Payment
exports.verifySignature = async (req, res) => {
    const { razorpay_order_id } = req.body.bodyData
    const { razorpay_payment_id } = req.body.bodyData
    const { razorpay_signature } = req.body.bodyData
    const { courses } = req.body.bodyData
    const user_id = req.user?.id

    // console.log(courses)
    // console.log(user_id)
    // console.log(razorpay_order_id)
    // console.log(razorpay_signature)
    // console.log(razorpay_payment_id)

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !user_id) {
        return res.status(200).json({
            success: false, message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id
    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (generated_signature === razorpay_signature) {
        await enrollStudents(courses, user_id, res)
        return res.status(200).json({
            success: true, message: "Payment Verified"
        })
    }
    return res.status(200).json({
        success: false, message: "Payment Failed"
    })
}

enrollStudents = async (courses, user_id, res) => {
    if (!courses || !user_id) {
        return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
    for (const course_id of courses) {

        try {
            const course = await Course.findByIdAndUpdate(course_id, { $push: { student_enrolled: user_id } }, { new: true });
            if (!course) {
                return res.status(500).json({
                    success: false, error: "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                course_id,
                user_id,
                completed_videos: [],
            })

            const enrolledStudent = await User.findByIdAndUpdate(user_id, { $push: { course_progress: courseProgress?._id, courses: course_id } }, { new: true });


            // Send an email notification to the enrolled student
            const emailResponse = sendMail(enrolledStudent.email, `Successfully Enrolled onto the ${course.course_name}`, courseEnrollment(course.course_name, `${enrolledStudent.first_name} ${enrolledStudent.last_name}`))


        } catch (error) {
            if (!inProduction()) {
            console.log(error)
            }
            return res.status(400).json({ success: false, error: error.message })
        }
    }
}

// Payment Success Email
exports.paymentSuccessEmail = async (req, res) => {
    const { order_id, payment_id, amount } = req.body;
    const user_id = req.user.id

    try {
        const student = await User.findById(user_id);
        if (!student) {
            return
        }

        // send payment success eamil
        const emailResponse = await sendMail(student.email, `Payment Recieved`, paymentSuccessEmailTmp(`${student.first_name} ${student.last_name}`, amount / 100, order_id, payment_id))

    } catch (error) {
        if (!inProduction()) {
        console.log("error in sending mail", error)
        }
        return res
            .status(400)
            .json({ success: false, message: "Could not send email" })
    }
}

// //capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {

//     // Getting data from request body
//     const { course_id, user_id } = req.body;

//     // validating Data
//     if (!course_id) {
//         return res.json({
//             success: false,
//             message: "Please Provide valid course ID",
//         });
//     }

//     let course;
//     try {
//         course = await Course.findOne(course_id);

//         if (!course) {
//             return res.json({
//                 success: false,
//                 message: 'Could not find the course'
//             });
//         }

//         // Check if user already enrolled in same course
//         const uid = new mongoose.Type.ObjectId(user_id);

//         if (course.student_enrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: 'Student is already enrolled',
//             });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             successs: false,
//             message: error.message,
//         });
//     }

//     // create order
//     const amount = course.price;
//     const currency = 'INR';
//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             course_id,
//             user_id,
//         }
//     }
//     // initialte payment
//     try {
//         const paymentResponse = await instance.orders.create(options)

//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success: true,
//             courseName: course.course_name,
//             courseDescription: course.course_desc,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });

//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: 'Could not initiate order',
//         });
//     }
// }

// // verify signature
// exports.verifySignature = async (req, res) => {
//     // get data from razorpay request
//     const signature = req.headers("x-razorpay-signature")
//     const { course_id, user_id } = req.body.paylaod.payment.entity.notes;

//     // create secret key
//     const webHookSecret = '123456'

//     // verify secret key
//     const hash = crypto.createHmac("sha256", webHookSecret);
//     hash.update(JSON.stringify(req.body));

//     if (signature === hash) {
//         try {
//             const course = await Course.findByIdAndUpdate(
//                 course_id,
//                 {
//                     $push:
//                         { student_enrolled: user_id },
//                 },
//                 { new: true },
//             )
//             if (!course) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Course not Found',
//                 });
//             }
//             const user = await User.findByIdAndUpdate(
//                 user_id,
//                 {
//                     $push:
//                         { courses: course_id },
//                 },
//                 { new: true },
//             )
//             if (!user) {
//                 return res.status(500).json({
//                     success: false,
//                     message: 'User not Found',
//                 });
//             }

//             const mailRes = sendMail(user.email, "Congratulations from CodeHelp", "Congratulations, You are onboarded into new Codehelp course");

//             console.log(emailResponse);
//             return res.status(200).json({
//                 success: true,
//                 message: "Signature Verified and Course added",
//             });

//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message,
//             });
//         }
//     } else {
//         return res.status(400).json({
//             success: false,
//             message: 'Invalid Request',
//         });
//     }

//     // update DB of course and user
//     // return
// }