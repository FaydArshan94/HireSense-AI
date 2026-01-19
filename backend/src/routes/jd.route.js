const express = require("express");

const { uploadJD } = require("../controllers/jd.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/upload-jd", authMiddleware, uploadJD);

module.exports = router;
