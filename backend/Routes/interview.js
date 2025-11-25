// backend/routes/interview.js
const express = require("express");
const router = express.Router();

// simple in-memory sample question bank
const questions = [
  { id: "q1", text: "Tell me about a time you solved a difficult problem." },
  { id: "q2", text: "Why do you want to work at our company?" },
  { id: "q3", text: "Describe a situation when you showed leadership." },
];

// GET a random question
router.get("/question/random", (req, res) => {
  const q = questions[Math.floor(Math.random() * questions.length)];
  res.json(q);
});

/**
 * POST /interview/evaluate
 * payload: { questionId, textAnswer }
 * In this stub we produce a fake evaluation. Replace with real LLM call.
 */
router.post("/interview/evaluate", express.json(), async (req, res) => {
  const { questionId, textAnswer } = req.body;
  if (!textAnswer) return res.status(400).json({ error: "textAnswer required" });

  // Fake evaluation logic — replace with a real model call
  const score = Math.max(0, Math.min(100, Math.floor(50 + textAnswer.length % 50)));
  const strengths = ["Clear structure", "Relevant example"].slice(0, Math.min(2, 2));
  const weaknesses = textAnswer.length < 50 ? ["Expand with more specifics"] : [];
  const tips = "Use STAR structure: Situation, Task, Action, Result. Be specific and quantify outcomes.";

  return res.json({
    score,
    strengths,
    weaknesses,
    tips,
  });
});

module.exports = router;
