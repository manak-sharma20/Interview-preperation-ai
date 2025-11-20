const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const connectDB = require("./config/db");

const authRoutes = require('./Routes/authRoutes');
const sessionRoutes = require('./Routes/sessionRoutes');
const questionRoutes = require('./Routes/questionRoutes');
const aiRoutes = require('./Routes/aiRoutes'); // Import AI routes
const { protect } = require("./middlewares/authMiddleware");
const app = express();

//middleware to handle CORS 
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))



connectDB()





//middleware
app.use(express.json());

//ROUTES
app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/ai", aiRoutes); // Use AI routes



//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
