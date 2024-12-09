import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import database from "./FirebaseConfig"; // Import the Realtime Database instance

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, "drivers"); // Reference to the "drivers" node in Realtime Database

    // Listen for changes to the "drivers" data
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val(); // Get the snapshot data
      if (data) {
        // Convert the object returned by Realtime Database to an array
        const driverData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDrivers(driverData);
      } else {
        setDrivers([]); // Set an empty array if no data exists
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Driver List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Mobile</th>
            <th className="border border-gray-300 px-4 py-2">Car Model</th>
            <th className="border border-gray-300 px-4 py-2">License Number</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td className="border border-gray-300 px-4 py-2">{driver.name}</td>
              <td className="border border-gray-300 px-4 py-2">{driver.mobile}</td>
              <td className="border border-gray-300 px-4 py-2">{driver.carModel}</td>
              <td className="border border-gray-300 px-4 py-2">{driver.licenseNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverList;
