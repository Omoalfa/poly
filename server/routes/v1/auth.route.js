const express = require('express');
const router = express();

const authController = require('../../controllers/auth.controller');

router.post('/login', authController.loginUser);

router.get('/login/:token', authController.loginWithToken);

router.get('/validateAccess', authController.validateAccess);

module.exports = router;