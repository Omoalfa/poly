const express = require('express');
const tasksController = require('../../controllers/tasks.controller');

const router = express.Router();
router.get('/taskType', tasksController.getTaskTypes);
router.get('/task/:Id', tasksController.getTaskById);
router.get('/:Id', tasksController.getTaskByProjectId);
router.post('/create',tasksController.createTask);
router.put('/update/:Id',tasksController.updateTask);
router.put('/updateStatus/:Id',tasksController.updateTaskStatus);
router.put('/completeTaskStatus/:Id',tasksController.completeTaskStatus);
router.put('/archiveTask/:Id',tasksController.archiveTask);
router.delete('/delete/:Id',tasksController.deleteTask);

module.exports = router;
