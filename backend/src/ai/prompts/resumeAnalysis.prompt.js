function buildResumeAnalysisPrompt(resumeText, jdText) {
  return `
You are an ATS-style resume screening system.

RULES (MANDATORY):
- Return JSON only
- Follow the exact output keys
- No explanations
- No markdown
- No extra text
- If any field cannot be generated, return an empty JSON object {}

OUTPUT FORMAT (STRICT):
{
  "matchScore": number (0-100),
  "matchedSkills": array of strings (max 20 items),
  "missingSkills": array of strings,
  "suggestions": array of short actionable strings
}

TASK:
1. Extract skills from the Job Description.
2. Extract skills from the Resume.
3. Compare both.
4. Calculate an overall match score.
5. Identify missing skills.
6. Provide improvement suggestions.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}
`;
}

module.exports = { buildResumeAnalysisPrompt };
