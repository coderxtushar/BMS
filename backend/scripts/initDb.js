const mongoose = require("mongoose");
const Bus = require("../models/bus");

const initialBuses = [
  { busNumber: "B101", destination: "", block: "A" },
  { busNumber: "B102", destination: "", block: "A" },
  { busNumber: "B103", destination: "", block: "B" },
  { busNumber: "B104", destination: "", block: "B" },
  { busNumber: "B105", destination: "", block: "C" },
  { busNumber: "B106", destination: "", block: "C" },
  { busNumber: "B107", destination: "", block: "D" },
  { busNumber: "B108", destination: "", block: "D" },
  // ... add all your buses here
];

async function initializeDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/bus_system",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("Connected to MongoDB");

    // Clear existing buses
    await Bus.deleteMany({});
    console.log("Cleared existing buses");

    // Insert new buses
    const result = await Bus.insertMany(initialBuses);
    console.log("Initialized database with buses:", result);

    return result;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Run if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => mongoose.connection.close())
    .catch((error) => {
      console.error("Failed to initialize database:", error);
      process.exit(1);
    });
}

module.exports = initializeDatabase;
