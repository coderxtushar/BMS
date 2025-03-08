import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = ({ buses, onUpdateBus }) => {
  const [selectedBusNumber, setSelectedBusNumber] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [destination, setDestination] = useState("");

  // All possible blocks (A through L)
  const allBlocks = Array.from("ABCDEFGHIJKL");

  // All possible bus numbers (B101 through B124)
  const allBusNumbers = Array.from({ length: 24 }, (_, i) => `B${101 + i}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBusNumber && selectedBlock) {
      try {
        const updateData = {
          busNumber: selectedBusNumber,
          block: selectedBlock,
          destination: destination,
        };

        console.log("Sending update request:", updateData);

        const response = await fetch("http://localhost:5000/api/buses/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update bus");
        }

        const data = await response.json();
        console.log("Update successful:", data);
        onUpdateBus(data);

        // Reset form
        setSelectedBusNumber("");
        setSelectedBlock("");
        setDestination("");
      } catch (error) {
        console.error("Error updating bus:", error);
        if (error.message === "Failed to execute 'json' on 'Response': Unexpected end of JSON input") {
          alert("Server error: No response received");
        } else {
          alert(`Failed to update bus: ${error.message}`);
        }
      }
    } else {
      alert("Please select both a bus number and a block");
    }
  };

  return (
    <div className="admin-panel">
      <h3>Admin Controls</h3>
      <form onSubmit={handleSubmit}>
        {/* Block Selection */}
        <select
          value={selectedBlock}
          onChange={(e) => setSelectedBlock(e.target.value)}
          required
        >
          <option value="">Select Block</option>
          {allBlocks.map((block) => (
            <option key={block} value={block}>
              Block {block}
            </option>
          ))}
        </select>

        {/* Bus Number Selection */}
        <select
          value={selectedBusNumber}
          onChange={(e) => setSelectedBusNumber(e.target.value)}
          required
        >
          <option value="">Select Bus Number</option>
          {allBusNumbers.map((busNumber) => (
            <option key={busNumber} value={busNumber}>
              {busNumber}
            </option>
          ))}
        </select>

        {/* Destination Input */}
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default AdminPanel;
