const express = require('express');
const { dbConnect } = require('./config/db.conn');
const app = express();
const PORT = process.env.PORT || 3000
require('dotenv').config();

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening to Port no. ${PORT}`)
})

dbConnect();