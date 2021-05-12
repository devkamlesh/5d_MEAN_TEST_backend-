const momentsSchema = require('./moment.model');
const fs = require('fs')

exports.addMoment = (req, res) => {
    try {
        const { title, tags, comment, imagePath } = req.body;
        const moment = new momentsSchema({ title, tags, comment, imagePath, userId: req.session.uid });
        moment.save((err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json({ data })
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.imageUpload = (req, res) => {
    try {
        res.json({ data: req.file })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.deleteOldImages = async (req, res) => {
    try {
        const { images } = req.body;
        if (images) {
            if (fs.existsSync(images)) {
                fs.unlink(images, (err) => {
                    if (err) {
                        return res.status(400).json({ error: err.message })
                    }
                })
                return res.json({ data: "file deleted successfully." })
            }
            res.json({ data: "file not present in folder" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getMoments = (req, res) => {
    try {
        momentsSchema.find({ userId: req.session.uid }, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json({ data });
        }).sort({ _id: -1 })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.getMomentById = (req, res) => {
    try {
        const { mId } = req.query;
        momentsSchema.find({ _id: mId, userId: req.session.uid }, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json({ data });
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.editMoment = (req, res) => {
    try {
        const { mId } = req.query;
        const { title, tags, comment, imagePath } = req.body;
        momentsSchema.update({ _id: mId, userId: req.session.uid }, { title, tags, comment, imagePath, updatedAt: Date.now() }, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json({ data });
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}

exports.deleteMoment = (req, res) => {
    try {
        const { mId } = req.query;
        momentsSchema.deleteOne({ _id: mId, userId: req.session.uid }, (err, data) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            return res.json({ data });
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}