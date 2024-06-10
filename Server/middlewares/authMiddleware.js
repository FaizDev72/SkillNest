const jwt = require('jsonwebtoken');
require('dotenv').config();

// Authentication Middleware
exports.auth = (req, res, next) => {
    try {
        // get details from body or header or cookies
        const token = req.body.token || req.cookies.token || req.header('Authorization').replace("Bearer ", "");

        // validate
        if (!token) {
            return
        }

        // verfy token
        try {
            const payload = jwt.verify(token, process.env.ENCRYPTING_KEY);
            req.user = payload;
        } catch (error) {
            console.log("Invalid token:", error.message);
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
                error: error.message,
            });
        }
        // next
        next();

    } catch (error) {
        console.log("Authorization error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to authorize user",
            error: error.message,
        });
    }
}

// isStudent Middleware
exports.isStudent = (req, res, next) => {
    try {
        const account_type = req.user.account_type;
        if (account_type != "student") {
            console.log("User is not a student");
            return res.status(403).json({
                success: false,
                message: "This is a protected route for students",
            });
        }
        next()
    } catch (error) {
        console.log("Authorization error for student route:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to authorize for student route",
            error: error.message,
        });
    }
}

// isInstructor Middleware
exports.isInstructor = (req, res, next) => {
    try {
        const account_type = req.user.account_type;
        if (account_type != "instructor") {
            console.log("User is not a instructor");
            return res.status(403).json({
                success: false,
                message: "This is a protected route for instructor",
            });
        }
        next()
    } catch (error) {
        console.log("Authorization error for instructor route:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to authorize for instructor route",
            error: error.message,
        });
    }
}

// isAdmin Middleware
exports.isAdmin = (req, res, next) => {
    try {
        const account_type = req.user.account_type;
        if (account_type != "admin") {
            console.log("User is not a admin");
            return res.status(403).json({
                success: false,
                message: "This is a protected route for admin",
            });
        }
        next()
    } catch (error) {
        console.log("Authorization error for admin route:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to authorize for admin route",
            error: error.message,
        });
    }
}