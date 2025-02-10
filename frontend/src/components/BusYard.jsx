import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import "./BusYard.css";

const BusYard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [buses, setBuses] = useState([
    // Block A
    { id: 1, busNumber: "B101", destination: "", block: "A" },
    { id: 2, busNumber: "B102", destination: "", block: "A" },
    // Block B
    { id: 3, busNumber: "B103", destination: "", block: "B" },
    { id: 4, busNumber: "B104", destination: "", block: "B" },
    // Block C
    { id: 5, busNumber: "B105", destination: "", block: "C" },
    { id: 6, busNumber: "B106", destination: "", block: "C" },
    // Block D
    { id: 7, busNumber: "B107", destination: "", block: "D" },
    { id: 8, busNumber: "B108", destination: "", block: "D" },
    // Block E
    { id: 9, busNumber: "B109", destination: "", block: "E" },
    { id: 10, busNumber: "B110", destination: "", block: "E" },
    // Block F
    { id: 11, busNumber: "B111", destination: "", block: "F" },
    { id: 12, busNumber: "B112", destination: "", block: "F" },
    // Block G
    { id: 13, busNumber: "B113", destination: "", block: "G" },
    { id: 14, busNumber: "B114", destination: "", block: "G" },
    // Block H
    { id: 15, busNumber: "B115", destination: "", block: "H" },
    { id: 16, busNumber: "B116", destination: "", block: "H" },
    // Block I
    { id: 17, busNumber: "B117", destination: "", block: "I" },
    { id: 18, busNumber: "B118", destination: "", block: "I" },
    // Block J
    { id: 19, busNumber: "B119", destination: "", block: "J" },
    { id: 20, busNumber: "B120", destination: "", block: "J" },
    // Block K
    { id: 21, busNumber: "B121", destination: "", block: "K" },
    { id: 22, busNumber: "B122", destination: "", block: "K" },
    // Block L
    { id: 23, busNumber: "B123", destination: "", block: "L" },
    { id: 24, busNumber: "B124", destination: "", block: "L" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user is admin (you might want to get this from your backend)
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
    window.location.reload();
  };

  const handleUpdateBus = (busId, newDestination) => {
    setBuses((prevBuses) =>
      prevBuses.map((bus) =>
        bus.id === parseInt(busId)
          ? { ...bus, destination: newDestination }
          : bus
      )
    );
  };

  // Group buses by block
  const busBlocks = buses.reduce((acc, bus) => {
    if (!acc[bus.block]) {
      acc[bus.block] = [];
    }
    acc[bus.block].push(bus);
    return acc;
  }, {});

  // Filter buses based on search
  const filteredBlocks = Object.entries(busBlocks).filter(([block, buses]) =>
    buses.some(
      (bus) =>
        bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        block.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bus-yard">
      <div className="header">
        <h2>Bus Yard</h2>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      {isAdmin && <AdminPanel buses={buses} onUpdateBus={handleUpdateBus} />}

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by bus number, destination, or block..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="blocks-container">
        {filteredBlocks.map(([block, buses]) => (
          <div key={block} className="block">
            <h3>Block {block}</h3>
            <div className="buses">
              {buses.map((bus) => (
                <div key={bus.id} className="bus-card">
                  <div className="bus-number">{bus.busNumber}</div>
                  <div className="bus-destination">
                    {bus.destination || "No destination set"}
                  </div>
                  <div className="block-label">Block {block}</div>
                </div>
              ))}
              {buses.length < 2 && (
                <div className="bus-card empty">
                  <p>Empty Spot</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusYard;
