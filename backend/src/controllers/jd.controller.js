const jdModel = require("../models/jd.model");
const resumeModel = require("../models/resume.model");
const mongoose = require("mongoose");

async function uploadJD(req, res) {
  try {
    const { resumeId, jobTitle, jdText } = req.body;

    if (!resumeId || !jobTitle || !jdText) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return res.status(400).json({ error: "Invalid resume ID." });
    }

    const resume = await resumeModel.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ error: "Resume not found." });
    }

    if (resume.userId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to use this resume." });
    }

    if (jdText.length > 5000) {
      return res.status(400).json({ error: "JD text exceeds maximum length." });
    }

    if (jdText.length < 100) {
      return res.status(400).json({ error: "JD text is too short." });
    }

    const trimmedJdText = jdText.trim();

    const newJD = new jdModel({
      userId: req.user._id,
      resumeId,
      jobTitle,
      jdText: trimmedJdText,
    });

    await newJD.save();

    return res.status(201).json({ message: "JD uploaded successfully.", jdId: newJD._id });
  } catch (error) {
    console.error("Error uploading JD:", error);
    return res.status(500).json({ error: "Failed to upload JD." });
  }
}

module.exports = { uploadJD };
