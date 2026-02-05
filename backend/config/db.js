const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI is missing in environment variables.");
    process.exit(1);
  }

  try {
    console.log("⏳ Connecting to MongoDB...");

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, // Stop trying after 10s
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);

    // Retry in 5 seconds if connection fails (Render friendly)
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
