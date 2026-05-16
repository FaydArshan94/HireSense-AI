const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  rawText: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    default: 1,
  },
  links: {
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    projectLinks: { type: [String], default: [] },
    certifications: { type: [String], default: [] },
  }
});

const resumeModel = mongoose.model("Resume", resumeSchema);

module.exports = resumeModel;