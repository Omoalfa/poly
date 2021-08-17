const express = require('express');
const taskStatusTypeController = require('../../controllers/taskStatusTypes.controller');

const router = express.Router();
router.get('/', taskStatusTypeController.getTaskStatusType);
router.get('/:Id', taskStatusTypeController.getTaskStatusTypeById);
router.post('/create', taskStatusTypeController.createTaskStatusType);
router.put('/update/:Id', taskStatusTypeController.updateTaskStatusType);
module.exports = router;
