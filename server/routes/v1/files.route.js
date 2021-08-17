const express = require('express');
const filesController = require('../../controllers/files.controller');

const router = express.Router();
router.get('/:Id', filesController.getFileById);
router.get('/project/:Id', filesController.getFileDataByProjectId);
router.get('/task/:Id', filesController.getFileDataBytaskId);
router.post('/project/:Id', filesController.uploadFileByProject);
router.post('/task/:Id', filesController.uploadFileByTask);
router.delete('/delete/:Id',filesController.deleteFile);

module.exports = router;
