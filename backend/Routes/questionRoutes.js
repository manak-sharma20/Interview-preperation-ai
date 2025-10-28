const express = require("express");
const router = express.Router();
const { addQuestionsToSession, togglePinQuestion, updateQuestionNote } = require("../controllers/questionController");
const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, addQuestionsToSession);
router.put("/:id/pin", protect, togglePinQuestion);
router.put("/:id/note", protect, updateQuestionNote);

module.exports = router;
