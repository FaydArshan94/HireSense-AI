const { GoogleGenAI } = require("@google/genai");
const {
  buildResumeAnalysisPrompt,
} = require("../prompts/resumeAnalysis.prompt");



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,

});

async function analyzeResumeWithGemini(resumeText, jdText) {
  const prompt = buildResumeAnalysisPrompt(resumeText, jdText);

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
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

module.exports = { analyzeResumeWithGemini };
