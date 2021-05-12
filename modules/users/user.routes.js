const router = require('express').Router();
const userController = require('./user.controller');
const verifyToken = require('../../middleware/auth');

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/user', verifyToken, userController.getUser);
router.get('/logout', verifyToken, userController.logoutUser);
router.get('/session', userController.checkSession);

module.exports = router;