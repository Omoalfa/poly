const express = require('express');
const projectsController = require('../../controllers/projects.controller');

const router = express.Router();
router.get('/', projectsController.getProjects);
router.get('/:Id', projectsController.getProjectsByTeamId);
router.get('/fetch/:Id', projectsController.getProjectById);
router.post('/create',projectsController.createProject);
router.put('/update/:Id',projectsController.updateProject);
router.delete('/delete/:Id',projectsController.deleteProject);
module.exports = router;
