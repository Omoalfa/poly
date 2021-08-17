const express = require('express');
const membersController = require('../../controllers/members.controller');

const router = express.Router();
router.get('/',membersController.getMembers);
router.get('/project/:Id',membersController.getMemberByProjectId);
router.get('/task/:Id',membersController.getMemberByTaskId);
router.get('/team/:Id',membersController.getMemberByTeamId);

module.exports = router;
