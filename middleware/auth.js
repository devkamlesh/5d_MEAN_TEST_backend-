const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('token');
    if (!req.session.uid || !token) {
        req.session.destroy();
        return res.json({message:401});
    } else {
        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified;
        } catch (error) {
            return res.status(400).send('Invalid token');
        }
        next();
    }
}

module.exports = verifyToken;