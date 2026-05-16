const express = require("express");
const {
  analyzeResume,
  getAnalysisHistory,
  getAnalysisById,
  getAnalysisUsage,
} = require("../controllers/ai.controller");
const authmiddleware = require("../middlewares/auth.middleware");
const { rewriteResume } = require("../controllers/rewrite.controller");
const router = express.Router();

router.post("/analyze-resume", authmiddleware, analyzeResume);
router.post("/rewrite-resume", authmiddleware, rewriteResume);
router.get("/history", authmiddleware, getAnalysisHistory);
router.get("/usage", authmiddleware, getAnalysisUsage);
router.get("/:id", authmiddleware, getAnalysisById);

module.exports = router;
