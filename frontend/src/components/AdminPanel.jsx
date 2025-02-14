import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = ({ buses, onUpdateBus }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [newDestination, setNewDestination] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBus && newDestination) {
      onUpdateBus(selectedBus, newDestination);
      setNewDestination("");
      setSelectedBus(null);
    }
  };

  return (
    <div className="admin-panel">
      <h3>Admin Controls</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedBus || ""}
          onChange={(e) => setSelectedBus(e.target.value)}
          required
          className="bus-select"
        >
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {`Bus ${bus.busNumber} - Block ${bus.block}`}
            </option>
          ))}
        </select>
        <select
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          required
          className="destination-select"
        >
          <option value="">Select Destination</option>
          {destinations.map((destination, index) => (
            <option key={index} value={destination}>
              {destination}
            </option>
          ))}
        </select>
        <button type="submit" className="update-button">Update Destination</button>
      </form>
    </div>
  );
};

export default AdminPanel;
