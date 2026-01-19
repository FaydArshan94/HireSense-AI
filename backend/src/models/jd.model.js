const mongoose = require("mongoose");

const jdSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resume",
    required: true,
  },
  jobTitle: { type: String, required: true },
  jdText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const jdModel = mongoose.model("JobDescription", jdSchema);

module.exports = jdModel;