const analysisModel = require("../models/ai.model");
const resumeModel = require("../models/resume.model");
const { rewriteResumeWithGemini } = require("../ai/services/ai.service");
const { generateResumePDF } = require("../ai/services/pdf.Service");
const mongoose = require("mongoose");

async function rewriteResume(req, res) {
    try {
        const { analysisId } = req.body;

        if (!analysisId) {
            return res.status(400).json({ error: "analysisId is required." });
        }

        if (!mongoose.Types.ObjectId.isValid(analysisId)) {
            return res.status(400).json({ error: "Invalid analysisId." });
        }

        // get the existing analysis
        const analysis = await analysisModel
            .findById(analysisId)
            .populate("resumeId", "rawText links");

        if (!analysis) {
            return res.status(404).json({ error: "Analysis not found." });
        }

        if (analysis.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized." });
        }

        const resumeText = analysis.resumeId?.rawText;
        if (!resumeText) {
            return res.status(404).json({ error: "Resume text not found." });
        }

        const missingSkills = analysis.analysisResult?.missingSkills || [];
        const suggestions = analysis.analysisResult?.suggestions || [];

        // call gemini to rewrite
        const aiRawResponse = await rewriteResumeWithGemini(
            resumeText,
            missingSkills,
            suggestions
        );

        let rewrittenData;
        try {
            const clean = aiRawResponse.replace(/```json|```/g, "").trim();
            rewrittenData = JSON.parse(clean);
        } catch {
            return res.status(500).json({ error: "Invalid AI response format." });
        }

        // generate PDF
        const pdfBuffer = await generateResumePDF(rewrittenData, analysis.resumeId?.links);

        // send PDF as download
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="hiresense_optimized_resume.pdf"`
        );
        res.setHeader("Content-Length", pdfBuffer.length);

        return res.end(pdfBuffer);
    } catch (error) {
        console.error("Resume rewrite error:", error);
        if (error.status === 429) {
            return res.status(429).json({ error: error.message });
        }
        return res.status(500).json({ error: "Failed to rewrite resume." });
    }
}

module.exports = { rewriteResume };