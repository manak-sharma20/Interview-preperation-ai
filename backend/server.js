require ("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//middleware to handle CORS
app.use(express.json());

//ROUTES


//Serve uploads folder
app.use("/uploads",express.static(path.join(__dirname,"uploads"),{}))


//Start Server
const Port = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
