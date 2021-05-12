const mongoose = require('mongoose');

const momentsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tags: { type: Array, required: true },
    imagePath: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: null },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' }
});
module.exports = new mongoose.model('moments', momentsSchema);