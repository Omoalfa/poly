const express = require('express');
const mailsController = require('../../controllers/mails.controller');

const router = express.Router();
router.post('/send', mailsController.sendUserInvitationEmail);
module.exports = router;
