const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const exists = await userModel.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res
        .status(409)
        .json({ message: "Username or email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      status: "active",
      role: "user",
      isEmailVerified: false,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User registered successfully.",
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function loginUser(req, res) {
  const { email, username, password } = req.body;

  try {
    if (!email && !username) {
      return res.status(400).json({ message: "Either email or username is required." });
    }

    const user = await userModel.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    if (user.status === "blocked") {
      return res.status(403).json({
        message: "Your account has been blocked. Please contact support.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    user.lastLoginAt = new Date();
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Login successful.",
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
