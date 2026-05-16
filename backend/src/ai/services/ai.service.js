const { GoogleGenAI } = require("@google/genai");
const {
  buildResumeAnalysisPrompt,
} = require("../prompts/resumeAnalysis.prompt");
const { buildResumeRewritePrompt } = require("../prompts/resumeRewrite.prompt");



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY

});

async function analyzeResumeWithGemini(resumeText, jdText) {
  const prompt = buildResumeAnalysisPrompt(resumeText, jdText);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    throw new Error("Empty AI response");
  }

  return aiText; // raw text (JSON string expected)
}

async function rewriteResumeWithGemini(resumeText, missingSkills, suggestions) {
  const prompt = buildResumeRewritePrompt(resumeText, missingSkills, suggestions);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    throw new Error("Empty AI response for resume rewrite");
  }

  return aiText;
}

module.exports = { analyzeResumeWithGemini, rewriteResumeWithGemini };
