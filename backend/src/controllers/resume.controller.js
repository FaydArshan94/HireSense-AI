const pdfParse = require("pdf-parse");
const resumeModel = require("../models/resume.model");

async function uploadResume(req, res) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed." });
    }

    const data = await pdfParse(file.buffer);

    if (!data || !data.text) {
      return res
        .status(500)
        .json({ error: "Failed to extract text from PDF." });
    }

    if (data.text.trim().length === 0) {
      return res.status(400).json({ error: "The uploaded PDF is empty." });
    }

    if (data.text.length > 10000) {
      return res.status(400).json({
        error: "The uploaded PDF exceeds the maximum allowed length.",
      });
    }

    let cleanedText = data.text.replace(/\s+/g, " ").trim();

    await resumeModel.create({
      userId: req.user._id,
      rawText: cleanedText,
      version: 1,
    });

    return res
      .status(200)
      .json({ message: "Resume uploaded successfully", text: cleanedText });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(500).json({ error: "Failed to upload resume." });
  }
}
module.exports = { uploadResume };
