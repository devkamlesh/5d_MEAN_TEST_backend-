const momentController = require('./moment.controller');
const routes = require('express').Router();
const multerUpload = require('../../middleware/multer');
const verifyToken = require('../../middleware/auth');

routes.post('/upload_image', verifyToken, multerUpload.single('images'), momentController.imageUpload);
routes.post('/delete_old_image', verifyToken, momentController.deleteOldImages);
routes.post('/moment', verifyToken, momentController.addMoment);
routes.get('/moment', verifyToken, momentController.getMoments);
routes.get('/momentbyId', verifyToken, momentController.getMomentById);
routes.post('/editmoment', verifyToken, momentController.editMoment);
routes.delete('/delete', verifyToken, momentController.deleteMoment);

module.exports = routes;