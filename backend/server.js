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

// ---------------- GLOBAL CORS ---------------- //
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }

      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ---------------- STATIC FILES ---------------- //
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- ROUTES ---------------- //
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/interview", interviewRoutes); // NEW

// ---------------- HEALTH CHECK ---------------- //
app.get("/api/health", (req, res) => {
  res.send("PrepTalk API is running...");
});

// ---------------- SERVE FRONTEND ---------------- //
app.use(express.static(path.join(__dirname, "../frontend/Prep-talk/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Prep-talk/dist/index.html"));
});

// ---------------- START SERVER ---------------- //
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n🚀 PrepTalk server running at: http://localhost:${PORT}`);
  console.log(`🔗 Allowed frontend: ${process.env.FRONTEND_URL}`);
});
