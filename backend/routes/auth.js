const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

// Register
router.post("/register", async (req, res) => {
  try {
    console.log("Received registration request:", req.body); // Debug log

    const { email, password, studentId, courseName } = req.body;

    if (!email || !password || !studentId || !courseName) {
      return res.status(400).json({
        message: "Please provide email, password, student ID, and course name",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      studentId,
      courseName,
    });

    console.log("Attempting to save user:", user); // Debug log

    await user.save();
    console.log("User saved successfully"); // Debug log

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        studentId: user.studentId,
        courseName: user.courseName,
      },
    });
  } catch (error) {
    console.error("Registration error:", error); // Debug log
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Login attempt received:", { email: req.body.email });

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide both email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    console.log("Password match:", isMatch ? "Yes" : "No");

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Send response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        studentId: user.studentId,
        courseName: user.courseName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Error during login",
      error: error.message,
    });
  }
});

// Get user data
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
});

module.exports = router;
