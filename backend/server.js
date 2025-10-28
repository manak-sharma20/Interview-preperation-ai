require ("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const { connect } = require("http2");
const connectDB = require("./config/db");

const authRoutes = require('./Routes/authRoutes')
const sessionRoutes = require('./Routes/sessionRoutes')
const questionRoutes = require('./Routes/questionRoutes')
const {generateInterviewQuestions,generateConceptExplaination} = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");
const app = express();

//middleware to handle CORS 
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUSH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))



connectDB()





//middleware
app.use(express.json());

//ROUTES
app.use("/api/auth",authRoutes);
app.use("/api/sessions",sessionRoutes);
app.use("/api/questions",questionRoutes);
app.use("/api/ai/generated-questions",protect,generateInterviewQuestions);
app.use("/api/ai/generated-explanation",protect,generateConceptExplaination);



//Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
