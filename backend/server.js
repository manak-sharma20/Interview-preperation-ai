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

const app = express();

// ---------------- CONNECT DATABASE ---------------- //
connectDB();

// ---------------- GLOBAL MIDDLEWARE ---------------- //
app.use(express.json());

// ---------------- GLOBAL CORS FIX ---------------- //
app.use(
  cors({
    origin: "http://localhost:5173", // frontend port
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

// ---------------- HEALTH CHECK ---------------- //
app.get("/", (req, res) => {
  res.send("PrepTalk API is running...");
});

// ---------------- START SERVER ---------------- //
const PORT = 8000;


app.listen(PORT, () => {
  console.log(`\n🚀 PrepTalk server running at: http://localhost:${PORT}`);
});
