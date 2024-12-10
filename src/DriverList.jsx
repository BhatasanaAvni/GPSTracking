import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import database from "./FirebaseConfig";

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const dbRef = ref(database, "drivers");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const driverData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setDrivers(driverData);
      } else {
        setDrivers([]);
      }
    });

    return () => unsubscribe();
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
