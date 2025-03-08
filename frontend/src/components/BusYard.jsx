import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import "./BusYard.css";

const BusYard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize with empty buses for all blocks
  useEffect(() => {
    const initializeBuses = async () => {
      try {
        console.log("Fetching buses...");
        const response = await fetch("/api/buses/all");

        if (!response.ok) {
          throw new Error("Failed to fetch buses");
        }

        const data = await response.json();
        console.log("Fetched buses:", data);
        setBuses(data);
      } catch (error) {
        console.error("Error fetching buses:", error);
        // Initialize with empty state if fetch fails
        const defaultBuses = Array.from("ABCDEFGHIJKL").flatMap((block) => ({
          busNumber: "",
          destination: "",
          block: block,
        }));
        setBuses(defaultBuses);
      }
    };

    // Check if user is admin
    const userRole = localStorage.getItem("userRole");
    setIsAdmin(userRole === "admin");

    initializeBuses();
  }, []);

  const handleLogout = () => {
    try {
      // Clear all authentication-related data
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      sessionStorage.clear();

      // Reset component state
      setIsAdmin(false);
      setBuses([]);
      setSearchTerm("");

      // Navigate to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout properly. Please try again.");
    }
  };

  const handleUpdateBus = (updatedBus) => {
    setBuses((prevBuses) => {
      // Create a new array with the updated bus information
      const newBuses = [...prevBuses];

      // Find and update the bus in its new block
      const existingBusIndex = newBuses.findIndex(
        (bus) => bus.busNumber === updatedBus.busNumber
      );

      if (existingBusIndex !== -1) {
        // Update existing bus
        newBuses[existingBusIndex] = updatedBus;
      } else {
        // Add new bus
        newBuses.push(updatedBus);
      }

      return newBuses;
    });
  };

  const handleRemoveBus = async (busNumber) => {
    try {
      console.log("Attempting to remove bus:", busNumber);

      const response = await fetch(`/api/buses/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ busNumber }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove bus");
      }

      const data = await response.json();
      console.log("Remove response:", data);

      // Update local state only after successful removal
      setBuses((prevBuses) =>
        prevBuses.filter((bus) => bus.busNumber !== busNumber)
      );
    } catch (error) {
      console.error("Error removing bus:", error);
      alert("Failed to remove bus: " + error.message);
    }
  };

  // Group buses by block
  const busBlocks = Array.from("ABCDEFGHIJKL").reduce((acc, block) => {
    acc[block] = buses.filter((bus) => bus.block === block).slice(0, 3); // Limit to 3 buses per block
    return acc;
  }, {});

  // Filter blocks based on search
  const filteredBlocks = Object.entries(busBlocks).filter(
    ([block, blockBuses]) =>
      searchTerm === "" ||
      block.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blockBuses.some(
        (bus) =>
          bus.busNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.destination?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <div className="bus-yard">
      <div className="header">
        <h2>Bus Yard</h2>
        <button onClick={handleLogout} className="logout-button" title="Logout">
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
        {filteredBlocks.map(([block, blockBuses]) => (
          <div key={block} className="block">
            <h3>Block {block}</h3>
            <div className="buses">
              {blockBuses.map((bus) =>
                bus.busNumber ? (
                  <div key={bus.busNumber} className="bus-card">
                    {isAdmin && (
                      <button
                        className="remove-bus-btn"
                        onClick={() => handleRemoveBus(bus.busNumber)}
                        title="Remove bus"
                      >
                        ×
                      </button>
                    )}
                    <div className="bus-number">{bus.busNumber}</div>
                    <div className="bus-destination">
                      {bus.destination || "No destination set"}
                    </div>
                    <div className="block-label">Block {block}</div>
                  </div>
                ) : null
              )}
              {blockBuses.length < 3 &&
                Array.from({ length: 3 - blockBuses.length }).map(
                  (_, index) => (
                    <div key={`empty-${index}`} className="bus-card empty">
                      <p>Empty Spot</p>
                    </div>
                  )
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusYard;
