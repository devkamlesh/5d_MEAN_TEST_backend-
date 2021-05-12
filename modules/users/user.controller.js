const userSchema = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    const { first_name, last_name, contact, city, email, password, } = req.body;
    //Checking registered user with same email
    const user = await userSchema.findOne({ email });
    if (user) return res.json({ message: "User already registered." });
    //Registering new user
    const hashpass = bcrypt.hashSync(password, 10);
    try {
        const user = await new userSchema({ first_name, last_name, contact, city, email, password: hashpass });
        await user.save((error, data) => {
            if (data) {
                res.json({ data: { _id: data._id, email: data.email } });
            } else {
                res.json({ error });
            }
        })
    } catch (error) {
        res.json({ error })
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    //finding user 
    const user = await userSchema.findOne({ email });
    if (user) {
        const dehash = bcrypt.compareSync(password, user.password);
        if (dehash) {
            req.session.uid = user._id;
            console.log(req.session)
            const login_user = {
                uid: req.session.uid
            }
            const token = jwt.sign(login_user, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.header({ 'token': token }).json({
                token
            })
        } else return res.json({ "message": "invalid password" })
    } else return res.json({ "message": "user not found" });
}

exports.getUser = async (req, res) => {
    try {
        const user = await userSchema.findById(req.session.uid)
        if (user) {
            res.json({
                name: user.first_name + " " + user.last_name,
                email: user.email,
                contact: user.contact,
                city: user.city,
            })
        }
    } catch (error) {
        res.json({ error })
    }

}

exports.logoutUser = async (req, res) => {
    try {
        console.log(req.session);
        req.session.save();
        req.session.destroy();
        res.clearCookie('_user5d').json({ 'message': 'logout successfully' })
    } catch (error) {
        res.json({ error })
    }
}

exports.checkSession = async (req, res) => {
    try {
        if (req.cookies) return res.json({ 'session': true })
        return res.json({ 'session': false })
    } catch (error) {
        res.json({ error })
    }
}