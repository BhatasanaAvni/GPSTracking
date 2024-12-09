// Dashboard.js
import React, { useState, useEffect } from "react";
import UpdateLocation from "./UpdateLocation";
import Live from "./Live";
import { getDatabase, ref, onValue } from "firebase/database";

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const driversRef = ref(db, "drivers");

    // Fetch drivers from Firebase
    onValue(driversRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driversList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDrivers(driversList);
        setSelectedDriver(driversList[0]?.id); // Default to the first driver
      }
    });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>

      {/* Dropdown for selecting a driver */}
      <select
        className="mb-4 px-4 py-2 border rounded-lg"
        value={selectedDriver}
        onChange={(e) => setSelectedDriver(e.target.value)}
      >
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.id}>
            {driver.name} - {driver.mobile}
          </option>
        ))}
      </select>

      {/* Update the driver's location */}
      {selectedDriver && <UpdateLocation driverId={selectedDriver} />}

      {/* Show the live map with the car's location */}
      {selectedDriver && <Live driverId={selectedDriver} />}
    </div>
  );
};

export default Dashboard;
