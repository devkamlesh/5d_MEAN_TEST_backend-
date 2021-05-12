const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
})

module.exports = new mongoose.model('users', userSchema)