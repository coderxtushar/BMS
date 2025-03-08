const express = require("express");
const router = express.Router();
const Bus = require("../models/bus");

// Get all buses
router.get("/all", async (req, res) => {
  try {
    const buses = await Bus.find();
    console.log("Fetched buses:", buses);
    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: "Failed to fetch buses", error: error.message });
  }
});

// Update bus
router.put("/update", async (req, res) => {
  try {
    const { busNumber, block, destination } = req.body;

    // Validate input
    if (!busNumber || !block) {
      return res.status(400).json({
        message: "Bus number and block are required",
      });
    }

    console.log("Updating bus:", { busNumber, block, destination });

    // Find and update the bus, or create if it doesn't exist
    const bus = await Bus.findOneAndUpdate(
      { busNumber },
      { block, destination },
      {
        new: true,
        upsert: true, // Create if doesn't exist
        setDefaultsOnInsert: true,
      }
    );

    console.log("Updated/Created bus:", bus);
    res.json(bus);
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(400).json({
      message: "Failed to update bus",
      error: error.message,
    });
  }
});

// Remove bus route
router.delete("/remove", async (req, res) => {
  try {
    const { busNumber } = req.body;
    console.log("Received remove request for bus:", busNumber);

    if (!busNumber) {
      return res.status(400).json({
        success: false,
        message: "Bus number is required",
      });
    }

    const result = await Bus.findOneAndDelete({ busNumber });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Bus ${busNumber} not found`,
      });
    }

    console.log("Successfully removed bus:", busNumber);
    res.json({
      success: true,
      message: "Bus removed successfully",
      removedBus: result,
    });
  } catch (error) {
    console.error("Error removing bus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove bus",
      error: error.message,
    });
  }
});

module.exports = router;