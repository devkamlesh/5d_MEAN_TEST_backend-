const mongoose = require("mongoose");
require('dotenv').config()
const mongoURL = process.env.MONGO_DB;
mongoose.connect(mongoURL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, data) => {
        if (!err) {
            console.log('connection established with mongodb atlas');
        }
    })