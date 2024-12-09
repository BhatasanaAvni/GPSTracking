// Live.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getDatabase, ref, onValue } from "firebase/database";

const Live = ({ driverId }) => {
  const [position, setPosition] = useState({ lat: 21.1702, lng: 72.8311 });

  useEffect(() => {
    const db = getDatabase();
    const driverRef = ref(db, `drivers/${driverId}/coordinates`);

    onValue(driverRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosition(snapshot.val());
      }
    });
  }, [driverId]);

  const carIcon = L.divIcon({
    html: "<div style='font-size: 24px; color: red;'>🚗</div>",
  });

  return (
    <div className="w-full h-screen">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={carIcon} />
      </MapContainer>
    </div>
  );
};

export default Live;
