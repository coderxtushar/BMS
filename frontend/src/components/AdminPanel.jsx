import { useState } from "react";
import "./AdminPanel.css";

const AdminPanel = ({ buses, onUpdateBus }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [newDestination, setNewDestination] = useState("");

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
        >
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus.id} value={bus.id}>
              {`Bus ${bus.busNumber} - Block ${bus.block}`}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Destination"
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
          required
        />
        <button type="submit">Update Destination</button>
      </form>
    </div>
  );
};

export default AdminPanel;
