const { GoogleGenAI } = require("@google/genai");
const {
  buildResumeAnalysisPrompt,
} = require("../prompts/resumeAnalysis.prompt");
const { buildResumeRewritePrompt } = require("../prompts/resumeRewrite.prompt");



const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY

});

async function executeWithRetry(operation, maxRetries = 3, initialDelay = 1000) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (error.status === 503) {
        attempt++;
        if (attempt >= maxRetries) {
          throw error;
        }
        const delay = initialDelay * Math.pow(2, attempt - 1);
        console.warn(`Gemini API busy (Status ${error.status}). Retrying in ${delay}ms... (Attempt ${attempt} of ${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

async function callGeminiWithFallback(prompt) {
  try {
    return await executeWithRetry(() => ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    }));
  } catch (error) {
    if (error.status === 429) {
      console.warn("Primary model 429. Falling back to gemini-1.5-flash...");
      try {
        return await executeWithRetry(() => ai.models.generateContent({
          model: "gemini-1.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }));
      } catch (fallbackError) {
        if (fallbackError.status === 429) {
          const limitError = new Error("Daily AI limit reached. Try again tomorrow or upgrade your plan.");
          limitError.status = 429;
          throw limitError;
        }
        throw fallbackError;
      }
    }
    throw error;
  }
}

async function analyzeResumeWithGemini(resumeText, jdText) {
  const prompt = buildResumeAnalysisPrompt(resumeText, jdText);

  const response = await callGeminiWithFallback(prompt);

  const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    throw new Error("Empty AI response");
  }

  return aiText; // raw text (JSON string expected)
}

async function rewriteResumeWithGemini(resumeText, missingSkills, suggestions) {
  const prompt = buildResumeRewritePrompt(resumeText, missingSkills, suggestions);

  const response = await callGeminiWithFallback(prompt);

  const aiText = response?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!aiText) {
    throw new Error("Empty AI response for resume rewrite");
  }

  return aiText;
}

module.exports = { analyzeResumeWithGemini, rewriteResumeWithGemini };
