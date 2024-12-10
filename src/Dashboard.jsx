import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import UpdateLocation from "./UpdateLocation";
import Live from "./Live";

const Dashboard = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const driversRef = ref(db, "drivers");

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
      {selectedDriver && <UpdateLocation driverId={selectedDriver} />}
      {selectedDriver && <Live driverId={selectedDriver} />}
    </div>
  );
};

export default Dashboard;
