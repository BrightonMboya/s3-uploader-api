const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
// const multer = require("multer")
dotenv.config();
const uploadController = require('../controllers/uploadController');
// const upload = multer()
const app = express();

// app.use(upload.array())


router.get('/', (_, res) => res.send('Welcome to S3 File Uploader'));
router.post('/upload', uploadController.uploadMyFile);
router.get('/files/', uploadController.getFiles);

module.exports = router;