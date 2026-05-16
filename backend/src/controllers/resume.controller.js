const pdfParse = require("pdf-parse");
const resumeModel = require("../models/resume.model");

async function uploadResume(req, res) {
  const keywords = ["experience", "education", "skills", "projects", "summary"];

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
      return res.status(500).json({ error: "Failed to extract text from PDF." });
    }

    if (data.text.trim().length === 0) {
      return res.status(400).json({ error: "The uploaded PDF is empty." });
    }

    if (data.text.length < 100) {
      return res.status(400).json({ error: "Uploaded file is not a valid resume" });
    }

    if (data.text.length > 10000) {
      return res.status(400).json({ error: "The uploaded PDF exceeds the maximum allowed length." });
    }

    const textLower = data.text.toLowerCase();
    const matches = keywords.filter((k) => textLower.includes(k));

    if (matches.length < 3) {
      return res.status(400).json({ error: "The uploaded PDF does not appear to be a valid resume." });
    }

    let cleanedText = data.text.replace(/\s+/g, " ").trim();

    // extract links from form-data fields
    const { linkedin, github, portfolio } = req.body;
    let projectLinks = [];
    let certifications = [];

    try {
      projectLinks = req.body.projectLinks ? JSON.parse(req.body.projectLinks) : [];
      certifications = req.body.certifications ? JSON.parse(req.body.certifications) : [];
    } catch {
      // if parsing fails just keep empty arrays
    }

    const resume = await resumeModel.create({
      userId: req.user._id,
      rawText: cleanedText,
      version: 1,
      links: {
        linkedin: linkedin || "",
        github: github || "",
        portfolio: portfolio || "",
        projectLinks,
        certifications,
      }
    });

    return res.status(200).json({
      message: "Resume uploaded successfully",
      text: cleanedText,
      id: resume._id,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res.status(500).json({ error: "Failed to upload resume." });
  }
}

module.exports = { uploadResume };