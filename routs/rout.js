const express = require('express');
const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageUploadQuality} = require('../controllers/filesController');

router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageUploadQuality',imageUploadQuality)

module.exports = router;