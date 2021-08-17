const express = require('express');
const subTasksController = require('../../controllers/subTasks.controller');

const router = express.Router();
router.get('/:Id', subTasksController.getSubTaskByTaskId);
router.post('/create',subTasksController.createSubTask);
router.put('/update/:Id',subTasksController.updateSubTask);

module.exports = router;
