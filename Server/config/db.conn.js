const mongoose = require('mongoose');
const inProduction = require('../utils/logger');
require('dotenv').config();

exports.dbConnect = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL);
        if (!inProduction()) {
        console.log("Database Connection Successfully Established");
        }
    } catch (error) {
        if (!inProduction()) {
        console.log("Error while connecting with Database ", error);
        }
    }
}