const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: [true, "Bus number is required"],
      unique: true,
      trim: true,
    },
    block: {
      type: String,
      required: [true, "Block is required"],
      trim: true,
    },
    destination: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-save middleware for additional validation if needed
busSchema.pre("save", function (next) {
  // You can add custom validation here if needed
  next();
});

module.exports = mongoose.model("Bus", busSchema);
