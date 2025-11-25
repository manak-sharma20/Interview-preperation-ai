const { GoogleGenerativeAI } = require("@google/generative-ai");
const { conceptExplainPrompt, questionAnswerPrompt } = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/** -------------------------------------------------------
 * SAFE JSON EXTRACTOR — bulletproof against AI formatting
 * ------------------------------------------------------- */
function extractJSON(rawText) {
  try {
    let clean = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/Here is.*?:/gi, "")
      .replace(/Below is.*?:/gi, "")
      .replace(/Output:/gi, "")
      .replace(/Response:/gi, "")
      .trim();

    // Gemini sometimes returns JSON with trailing commas
    clean = clean.replace(/,(\s*[}\]])/g, "$1");

    return JSON.parse(clean);
  } catch (err) {
    console.error("❌ JSON Parse FAILED:");
    console.error("RAW TEXT:", rawText);
    return null;
  }
}

/** -------------------------------------------------------
 * Normalize Gemini output → ALWAYS return [{ id, text }]
 * ------------------------------------------------------- */
function normalizeQuestions(list) {
  if (!Array.isArray(list)) return [];

  return list.map((q, i) => ({
    id: q.id || i + 1,
    text: q.text || q.question || "Untitled question"
  }));
}

/** -------------------------------------------------------
 * Generate Interview Questions
 * ------------------------------------------------------- */
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message:
          "Missing fields: role, experience, topicsToFocus, numberOfQuestions",
      });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    let json = extractJSON(rawText);

    if (!json) {
      return res.status(500).json({
        message: "AI returned invalid format. Check console logs.",
        rawAI: rawText,
      });
    }

    const normalized = normalizeQuestions(json);

    return res.status(200).json(normalized);
  } catch (error) {
    console.error("🔥 GEMINI ERROR:", error);

    return res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

/** -------------------------------------------------------
 * Generate Concept Explanation
 * ------------------------------------------------------- */
const generateConceptExplaination = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        message: "Question field is required",
      });
    }

    const prompt = conceptExplainPrompt(question);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    let json = extractJSON(rawText);

    if (!json) {
      return res.status(500).json({
        message: "Explaination: AI returned invalid JSON",
        rawAI: rawText,
      });
    }

    return res.status(200).json(json);
  } catch (error) {
    console.error("🔥 GEMINI ERROR:", error);

    return res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplaination,
};
