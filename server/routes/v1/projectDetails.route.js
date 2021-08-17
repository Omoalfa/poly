const express = require('express');
const projectDetailsController = require('../../controllers/projectDetails.controller');

const router = express.Router();
router.get('/', projectDetailsController.getHomePageDetails);
router.get('/:Id', projectDetailsController.getHomePageDetail);
router.put('/update/:Id', projectDetailsController.updateDetail);
module.exports = router;
