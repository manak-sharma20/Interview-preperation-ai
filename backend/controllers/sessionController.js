const Session = require("../models/Session");
const Question = require("../models/Question");

// ------------------- Create a New Session ------------------- //
exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    if (!role || !experience || !topicsToFocus) {
      return res.status(400).json({
        success: false,
        message: "role, experience, and topicsToFocus are required",
      });
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Questions array is required",
      });
    }

    for (const q of questions) {
      if (!q.question || !q.answer) {
        return res.status(400).json({
          success: false,
          message: "Each question must contain { question, answer }",
        });
      }
    }

    const userId = req.user.id;

    // Create session entry
    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description: description || "",
    });

    // Create linked questions
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    // Assign question IDs to session
    session.questions = createdQuestions.map((q) => q._id);
    await session.save();

    // Populate for response
    const populatedSession = await Session.findById(session._id).populate("questions");

    return res.status(201).json({
      success: true,
      session: populatedSession,
    });
  } catch (error) {
    console.error("Create session error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ------------------- Get Sessions for Logged-in User ------------------- //
exports.getMySession = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");

    return res.status(200).json({ success: true, sessions });
  } catch (error) {
    console.error("Get my sessions error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ------------------- Get Session by ID ------------------- //
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    return res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Get session by ID error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ------------------- Delete Session & Its Questions ------------------- //
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    // Delete all associated questions
    await Question.deleteMany({ session: session._id });

    // Delete session itself
    await session.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Delete session error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
