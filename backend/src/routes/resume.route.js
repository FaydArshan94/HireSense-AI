const express = require("express");
const { uploadResume } = require("../controllers/resume.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", authMiddleware, upload.single("file"), uploadResume);

module.exports = router;