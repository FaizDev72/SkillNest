const express = require('express');
const { dbConnect } = require('./config/db.conn');
const { cloudinaryConnect } = require('./config/Cloudnary');
const userRouter = require('./routers/userRouter')
const profileRouter = require('./routers/profileRouter')
const paymentRouter = require('./routers/paymentRouter')
const courseRouter = require('./routers/courseRouter')
const cookieParser = require('cookie-parser');
const cors = require('cors'); //backened entertain the front request
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 4000
require('dotenv').config();

// Clodinary Connection
cloudinaryConnect();

// Database Connection
dbConnect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
)
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Routes
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/profile', profileRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/payment', paymentRouter)

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running..."
    });
});

app.listen(PORT, () => {
    console.log(`Listening to Port no. ${PORT}`)
})

