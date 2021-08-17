const express = require('express');
const taskNotesController = require('../../controllers/taskNotes.controller');

const router = express.Router();
router.get('/:Id', taskNotesController.getTaskNoteById);
router.get('/note/:Id', taskNotesController.getTaskNoteByNoteId);
router.post('/create',taskNotesController.createTaskNote);
router.put('/update/:Id',taskNotesController.updateTaskNote);
router.delete('/delete/:Id',taskNotesController.deleteTaskNote);

module.exports = router;
