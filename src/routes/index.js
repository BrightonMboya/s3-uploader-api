const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const multer = require("multer");

const router = express.Router();
dotenv.config();
const uploadController = require("../controllers/uploadController");
// const upload = multer({ dest: "src/uploads/" });
const upload = multer();

router.get("/", (_, res) => res.send("Welcome to S3 File Uploader"));
router.post("/upload", upload.single("File"), uploadController.uploadMyFile);
router.put("/upload", upload.single("File"), uploadController.uploadMyFile);
router.get("/files/", uploadController.getFiles);

module.exports = router;
