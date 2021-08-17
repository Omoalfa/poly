const express = require('express');
const teamsController = require('../../controllers/teams.controller');

const router = express.Router();
router.get('/', teamsController.getTeams);
router.get('/:Id',teamsController.getTeamById);
router.post('/create',teamsController.createTeam);
router.put('/update/:Id',teamsController.updateTeam);
router.delete('/delete/:Id',teamsController.deleteTeam);

module.exports = router;
