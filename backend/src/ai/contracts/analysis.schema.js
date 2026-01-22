const analysisSchema = {
  matchScore: {
    type: Number,
    range: 0 - 100,
  },
  matchedSkills: {
    type: Array,
    items: [],
    maxItems: 20,
  },
  missingSkills: {
    type: Array,
    items: [],
  },
  suggestions: {
    type: Array,
    items: [],
  },
};

module.exports = { analysisSchema };
