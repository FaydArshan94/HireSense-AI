const mongoose = require("mongoose");

const analysisModel = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    resumeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jdId: { type: mongoose.Schema.Types.ObjectId, required: true },
    analysisResult: { type: Object, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Analysis", analysisModel);
