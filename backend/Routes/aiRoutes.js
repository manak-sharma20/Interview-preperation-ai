const express = require('express');
const router = express.Router();
const { generateInterviewQuestions, generateConceptExplaination } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/generate-questions', protect, generateInterviewQuestions);
router.post('/generate-explanation', protect, generateConceptExplaination);

module.exports = router;
