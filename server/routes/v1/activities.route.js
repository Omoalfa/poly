const express = require('express');
const activitiesController = require('../../controllers/activities.controller');

const router = express.Router();
router.get('/', activitiesController.getActivites);
router.get('/:Id', activitiesController.getActivityByProjectId);
router.get('/task/:Id', activitiesController.getActivityByTaskId);

module.exports = router;
