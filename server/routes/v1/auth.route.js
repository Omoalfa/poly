const express = require('express');
const router = express();

const authController = require('../../controllers/auth.controller');

router.post('/login', authController.login);

router.post('/register', authController.registerUser);

router.post('/forgotpassword', authController.forgotPassword);

router.get('/validateAccess', authController.validateAccess)

router.post('/resetpassword/:token', authController.resetPassword)

module.exports = router;