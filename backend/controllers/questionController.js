const Question = require("../models/Question");
const Session = require("../models/Session");

// ---------------- Add Questions to Session ---------------- //
exports.addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "sessionId and questions array are required",
      });
    }

    // Validate session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Validate each question object
    for (const q of questions) {
      if (!q.question || !q.answer) {
        return res.status(400).json({
          message: "Each question must contain { question, answer }",
        });
      }
    }

    // Create questions
    const createdQuestions = await Question.insertMany(
      questions.map(q => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Add question IDs to session
    session.questions.push(...createdQuestions.map(q => q._id));
    await session.save();

    return res.status(201).json({
      success: true,
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("Add questions error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ---------------- Toggle Pin Question ---------------- //
exports.togglePinQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Toggle pin status
    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Pin toggle error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ---------------- Update Question Note ---------------- //
exports.updateQuestionNote = async (req, res) => {
  try {
    const { note } = req.body;

    if (typeof note === "undefined") {
      return res.status(400).json({ message: "Note field is required" });
    }

    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.note = note.trim();
    await question.save();

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (error) {
    console.error("Note update error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
