const resumeModel = require("../models/resume.model");
const jdModel = require("../models/jd.model");
const { analyzeResumeWithGemini } = require("../ai/services/ai.service");
const { analysisSchema } = require("../ai/contracts/analysis.schema");
const analysisModel = require("../models/ai.model");
const mongoose = require("mongoose");

async function analyzeResume(req, res) {
  const dailyLimit = 3;

  try {
    const { jdId } = req.body;

    if (!jdId) {
      return res
        .status(400)
        .json({ error: "Job Description ID (jdId) is required." });
    }

    const jd = await jdModel.findById(jdId);
    if (!jd) {
      return res.status(404).json({ error: "Job Description not found." });
    }

    if (jd.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Unauthorized access to this Job Description." });
    }

    const exisitngAnalysis = await analysisModel.findOne({ jdId });
    if (exisitngAnalysis) {
      return res.status(200).json({
        analysis: exisitngAnalysis.analysisResult,
        message: "Analysis already exists.",
      });
    }

    const resume = await resumeModel.findById(jd.resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found." });
    }

    const startofDay = new Date();
    startofDay.setHours(0, 0, 0, 0);

    const todayAnalysisCount = await analysisModel.countDocuments({
      userId: req.user._id,
      createdAt: { $gte: startofDay },
    });
    if (todayAnalysisCount >= dailyLimit) {
      const resetAt = new Date();
      resetAt.setHours(24, 0, 0, 0); // next midnight

      return res.status(429).json({
        error: "DAILY_LIMIT_REACHED",
        message: "You have reached your daily analysis limit.",
        limit: dailyLimit,
        used: todayAnalysisCount,
        remaining: 0,
        resetAt: resetAt.toISOString(),
      });
    }

    const aiRawResponse = await analyzeResumeWithGemini(
      resume.rawText,
      jd.jdText,
    );

    let analysisResult;

    try {
      analysisResult = JSON.parse(aiRawResponse);
    } catch {
      return res.status(500).json({ error: "Invalid AI response format" });
    }

    for (const key of Object.keys(analysisSchema)) {
      if (!(key in analysisResult)) {
        return res.status(500).json({ error: "AI response missing fields" });
      }
    }

    const analysis = await analysisModel.create({
      userId: req.user._id,
      resumeId: resume._id,
      jdId: jd._id,
      analysisResult,
      modelUsed: "gemini-3-flash-preview",
    });

    return res.status(200).json({
      analysisId: analysis._id,
      analysis: analysisResult,
      usage: {
        limit: dailyLimit,
        used: todayAnalysisCount + 1,
        remaining: dailyLimit - todayAnalysisCount - 1,
      },
    });
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return res.status(500).json({ error: "AI analysis failed" });
  }
}

async function getAnalysisById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid analysis ID" });
    }

    const analysis = await analysisModel
      .findById(id)
      .populate("jdId", "jobTitle jdText")
      .populate("resumeId", "rawText");

    if (!analysis) {
      return res.status(404).json({ error: "Analysis not found" });
    }

    if (analysis.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    return res.status(200).json({ analysis });
  } catch (error) {
    console.error("Get analysis error:", error);
    return res.status(500).json({ error: "Failed to fetch analysis" });
  }
}

async function getAnalysisHistory(req, res) {
  try {
    const analyses = await analysisModel
      .find({ userId: req.user._id })
      .populate("jdId", "jobTitle")
      .sort({ createdAt: -1 })
      .limit(10);

    const formattedAnalyses = analyses.map((analysis) => ({
      _id: analysis._id,
      jobTitle: analysis.jdId?.jobTitle || "Unknown Position",
      matchScore: analysis.analysisResult?.matchScore || 0,
      createdAt: analysis.createdAt,
    }));

    return res.status(200).json({ analyses: formattedAnalyses });
  } catch (error) {
    console.error("Analysis history error:", error);
    return res.status(500).json({ error: "Failed to fetch analysis history" });
  }
}


async function getAnalysisUsage(req,res){
  try {
    const startofDay = new Date();
    startofDay.setHours(0, 0, 0, 0);

    const dailyLimit = 3;

    const todayAnalysisCount = await analysisModel.countDocuments({
      userId: req.user._id,
      createdAt: { $gte: startofDay },
    });

    return res.status(200).json({
      limit: dailyLimit,
      used: todayAnalysisCount,
      remaining: Math.max(dailyLimit - todayAnalysisCount, 0),
    });
  } catch (error) {
    console.error("Get analysis usage error:", error);
    return res.status(500).json({ error: "Failed to fetch analysis usage" });
  }
}

module.exports = { analyzeResume, getAnalysisById, getAnalysisHistory, getAnalysisUsage };
