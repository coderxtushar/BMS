const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const busesRoutes = require("./routes/buses");
const initializeDatabase = require("./scripts/initDb");
initializeDatabase();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // or whatever your frontend URL is
    credentials: true,
  })
);

app.use(express.json());

// Connect to MongoDB with additional options
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    console.log("MongoDB URI:", process.env.MONGODB_URI); // Debug log
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busesRoutes);

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.url}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
