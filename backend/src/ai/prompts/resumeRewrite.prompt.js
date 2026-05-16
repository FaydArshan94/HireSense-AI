function buildResumeRewritePrompt(resumeText, missingSkills, suggestions) {
  return `
You are an expert resume writer and ATS optimization specialist.

RULES (MANDATORY):
- Return JSON only
- No explanations
- No markdown
- No extra text
- Keep the candidate's real experience intact — do NOT fabricate anything
- NEVER add technologies, tools, or skills that are NOT already present in the original resume
- Missing skills should only be added to the SKILLS LIST if they are minor and learnable, never injected into project descriptions
- Do NOT fabricate experience, tools, or achievements under any circumstances
- Only enhance the language and impact of what already exists
- Make the language more impactful and professional

OUTPUT FORMAT (STRICT):
{
  "name": string,
  "email": string,
  "phone": string,
  "location": string,
  "summary": string (2-3 lines, powerful and ATS optimized),
  "skills": array of strings,
  "experience": [
    {
      "title": string,
      "company": string,
      "duration": string,
      "bullets": array of strings (strong action verbs, quantified where possible)
    }
  ],
  "education": [
    {
      "degree": string,
      "institution": string,
      "year": string
    }
  ],
  "projects": [
    {
      "name": string,
      "description": string,
      "tech": array of strings
    }
  ]
}

MISSING SKILLS TO INCORPORATE NATURALLY:
${missingSkills.join(", ")}

IMPROVEMENT SUGGESTIONS TO APPLY:
${suggestions.join("\n")}

ORIGINAL RESUME:
${resumeText}
`;
}

module.exports = { buildResumeRewritePrompt };