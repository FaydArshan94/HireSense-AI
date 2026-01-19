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
});

const resumeModel = mongoose.model("Resume", resumeSchema);

module.exports = resumeModel;