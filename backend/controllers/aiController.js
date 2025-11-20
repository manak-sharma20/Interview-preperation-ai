const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---- Utility: Safely extract JSON from AI response ---- //
function extractJSON(rawText) {
  try {
    // Remove markdown fences
    let clean = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^\s*Here is.*?:/gi, "") 
      .replace(/^\s*Below is.*?:/gi, "")
      .trim();

    // Attempt direct JSON parse
    return JSON.parse(clean);
  } catch (err) {
    console.error("❌ JSON parsing failed. Raw text:", rawText);
    return { error: "Invalid AI JSON format", rawText };
  }
}

// ---- Generate Interview Questions ---- //
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "All fields are required: role, experience, topicsToFocus, numberOfQuestions",
      });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const data = extractJSON(rawText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Interview generation error:", error.message);
    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

// ---- Generate Concept Explanation ---- //
const generateConceptExplaination = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question field is required" });
    }

    const prompt = conceptExplainPrompt(question);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    const data = extractJSON(rawText);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Concept explanation error:", error.message);
    return res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplaination };