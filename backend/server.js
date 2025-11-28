const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");

// Routes
const authRoutes = require("./Routes/authRoutes");
const sessionRoutes = require("./Routes/sessionRoutes");
const questionRoutes = require("./Routes/questionRoutes");
const aiRoutes = require("./Routes/aiRoutes");
const interviewRoutes = require("./Routes/interview");

const app = express();

// ---------------- CONNECT DATABASE ---------------- //
connectDB();

// ---------------- GLOBAL MIDDLEWARE ---------------- //
app.use(express.json());

// ---------------- CORS CONFIG ---------------- //
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Fix "Missing parameter name at index ..." error (Express v5)
app.options("(.*)", cors());

// ---------------- STATIC FILES ---------------- //
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- API ROUTES ---------------- //
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes);

// ---------------- HEALTH CHECK ---------------- //
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "PrepTalk API is running" });
});

// ---------------- SERVE FRONTEND (Optional for local preview) ---------------- //
app.use(express.static(path.join(__dirname, "../frontend/Prep-talk/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Prep-talk/dist/index.html"));
});

// ---------------- START SERVER ---------------- //
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Frontend allowed: ${process.env.FRONTEND_URL}`);
});
