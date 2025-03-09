import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = ({ buses, onUpdateBus }) => {
  const [selectedBusNumber, setSelectedBusNumber] = useState("");
  const [selectedBlock, setSelectedBlock] = useState("");
  const [destination, setDestination] = useState("");

  // All possible blocks (A through T2)
  const allBlocks = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
    "M", "N", "O", "P", "Q", "R", "S", "T1", "T2"
  ];
  // All possible bus numbers (B101 through B124)
  // const allBusNumbers = Array.from({ length: 24 }, (_, i) => `B${101 + i}`);

  // All bus numbers with their blocks
  const allBusNumbers = [
    // Block A
    { busNumber: "8748", block: "A" },
    { busNumber: "8795", block: "A" },
    // Block B
    { busNumber: "8707", block: "B" },
    { busNumber: "2377", block: "B" },
    // Block C
    { busNumber: "2375", block: "C" },
    { busNumber: "8219", block: "C" },
    // Block D
    { busNumber: "2376", block: "D" },
    { busNumber: "8712", block: "D" },
    // Block E
    { busNumber: "7647", block: "E" },
    { busNumber: "1543", block: "E" },
    // Block F
    { busNumber: "7646", block: "F" },
    { busNumber: "2373", block: "F" },
    // Block G
    { busNumber: "8711", block: "G" },
    { busNumber: "7634", block: "G" },
    // Block H
    { busNumber: "2372", block: "H" },
    { busNumber: "8713", block: "H" },
    // Block I
    { busNumber: "8704", block: "I" },
    { busNumber: "8701", block: "I" },
    // Block J
    { busNumber: "9452", block: "J" },
    { busNumber: "8746", block: "J" },
    // Block K
    { busNumber: "9949", block: "K" },
    { busNumber: "8824", block: "K" },
    // Block L
    { busNumber: "8220", block: "L" },
    { busNumber: "8709", block: "L" },
    // Block M
    { busNumber: "8221", block: "M" },
    { busNumber: "8699", block: "M" },
    { busNumber: "8747", block: "M" },
    // Block N
    { busNumber: "8708", block: "N" },
    { busNumber: "9453", block: "N" },
    // Block O
    { busNumber: "7589", block: "O" },
    { busNumber: "8692", block: "O" },
    { busNumber: "8702", block: "O" },
    { busNumber: "7590", block: "O" },
    // Block P
    { busNumber: "7586", block: "P" },
    { busNumber: "8128", block: "P" },
    { busNumber: "8703", block: "P" },
    { busNumber: "7588", block: "P" },
    // Block Q
    { busNumber: "8127", block: "Q" },
    { busNumber: "8129", block: "Q" },
    { busNumber: "2250", block: "Q" },
    // Block R
    { busNumber: "8126", block: "R" },
    { busNumber: "8715", block: "R" },
    { busNumber: "8125", block: "R" },
    // Block S
    { busNumber: "2538", block: "S" },
    { busNumber: "8698", block: "S" },
    // Block T1
    { busNumber: "8690", block: "T1" },
    { busNumber: "8697", block: "T1" },
    { busNumber: "8691", block: "T1" },
    { busNumber: "8693", block: "T1" },
    { busNumber: "8695", block: "T1" },
    // Block T2
    { busNumber: "8696", block: "T2" },
    { busNumber: "8796", block: "T2" },
    { busNumber: "7587", block: "T2" },
    { busNumber: "2374", block: "T2" },
  ];


  // Destination List
  const destinations = [
    "Mandi",
    "CB Ganj",
    "Kudeshiya",
    "Kargaina",
    "Greenpark",
    "100 Futta",
    "Ayub khan",
    "Mahanagar",
    "84 Ghanta",
    "Koharapeer",
    "Prem Nagar",
    "Airforce",
    "Hartman",
    "Vipin Hospital",
    "Qila Mazar",
    "Railway junction",
    "Sadar",
    "Karamchari Nagar",
    "Lal Fatak",
    "Sanjay Nagar",
    "Kk hospital",
    "Dharamkanta",
    "Selection Point",
    "City Station",
    "Green Park"
  ];

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
          {allBusNumbers
            .filter((bus) => !selectedBlock || bus.block === selectedBlock)
            .map((bus) => (
              <option key={bus.busNumber} value={bus.busNumber}>
                {bus.busNumber}
              </option>
            ))}
        </select>

        {/* Destination Dropdown */}
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          <option value="">Select Destination</option>
          {destinations.map((dest) => (
            <option key={dest} value={dest}>
              {dest}
            </option>
          ))}
        </select>

        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default AdminPanel;
