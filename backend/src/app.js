const express = require("express");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const resumeRoutes = require("./routes/resume.route");
const jdRoutes = require("./routes/jd.route");
const aiRoute = require("./routes/ai.route");
const cors = require("cors");


const app = express();



// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());


app.use(cors({ origin: "http://localhost:3000", credentials: true, methods: ["GET", "POST", "PUT", "DELETE"] }));


app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jd", jdRoutes);
app.use("/api/ai", aiRoute);


module.exports = app;
