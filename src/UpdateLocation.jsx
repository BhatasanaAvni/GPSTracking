// UpdateLocation.js
import React, { useEffect } from "react";
import { getDatabase, ref, set } from "firebase/database";

const UpdateLocation = ({ driverId }) => {
  const updateLocation = (lat, lng) => {
    const db = getDatabase();
    set(ref(db, `drivers/${driverId}/coordinates`), {
      lat,
      lng,
    });
  };

  useEffect(() => {
    const watchPosition = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        updateLocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchPosition);
  }, [driverId]);

  return null;
};

export default UpdateLocation;
