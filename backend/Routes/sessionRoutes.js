const express = require("express");
const router = express.Router();
const { createSession, getMySession, getSessionById, deleteSession } = require("../controllers/sessionController");
const { protect } = require("../middlewares/authMiddleware");

// Routes
router.post("/", protect, createSession);
router.get("/", protect, getMySession);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

module.exports = router;
