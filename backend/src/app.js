const express = require("express");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const resumeRoutes = require("./routes/resume.route");
const jdRoutes = require("./routes/jd.route");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jd", jdRoutes);

module.exports = app;
