const express = require('express');
const session = require('express-session');
const { mongoose } = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require('dotenv').config()

// routes import
const userRoutes = require('./modules/users/user.routes');
const momentRoutes = require('./modules/moments/moment.routes');

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const options = {
    origin: [
        'http://localhost:4200'
    ],
    credentials: true,
    preflightContinue: true,
}
app.use(cors(options));

// session
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    name: '_user5d',
    cookie: {
        maxAge: 1000 * 60 * 60,
    }
}))

// routes
app.use('/api', userRoutes);
app.use('/api', momentRoutes);

app.get('/', (req, res) => {
    res.json({ msg: "Welcome to private routes" })
})
var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running on port ", port);
})