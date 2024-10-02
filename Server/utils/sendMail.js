const nodemailer = require('nodemailer')
require('dotenv').config();

exports.sendMail = async (sendTo, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        })

        const info = await transporter.sendMail({
            from: "SkillNest - EdTech Platform for Learning Coding",
            to: `${sendTo}`,
            subject: `${subject}`,
            html: `${body}`
        })

        return info;

    } catch (error) {
        if (!inProduction()) {
            console.log("Error occurred during sending mail: ", error); 
        }    }
}