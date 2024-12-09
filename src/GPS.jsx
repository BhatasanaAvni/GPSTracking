import React from "react";
import { useState } from "react";

const GPS = () => {
  const [latitude, setLatitude] = useState(null); // Stores user's current latitude
  const [longitude, setLongitude] = useState(null); // Stores user's current longitude
  const [address, setAddress] = useState(""); // Stores the fetched address

  const [GPSLatitude, setGPSLatitude] = useState(null); // Reserved for specific GPS latitude (optional)
  const [GPSLongitude, setGPSLongitude] = useState(null); // Reserved for specific GPS longitude (optional)

  // Fetches the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        userCoords,
        (error) => {
          console.error("Error getting location: ", error);
        },
        { enableHighAccuracy: true } // Use high-accuracy mode for better results
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Updates latitude and longitude states
  function userCoords(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    setLatitude(userLatitude);
    setLongitude(userLongitude);

    // Optional: Update GPS-specific states
    setGPSLatitude(userLatitude);
    setGPSLongitude(userLongitude);

    console.log("Latitude: ", userLatitude);
    console.log("Longitude: ", userLongitude);
  }

  // Fetches the address from latitude and longitude
  const getUserAddress = async () => {
    if (latitude && longitude) {
      const url = `https://api.opencagedata.com/geocode/v1/json?key=3f4dcb08411a488f9cd5eba443774599&q=${latitude},${longitude}&pretty=1&no_annotations=1`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const formattedAddress =
          data?.results?.[0]?.formatted || "Address not found";
        setAddress(formattedAddress);
        console.log("User Address: ", formattedAddress);
      } catch (error) {
        console.error("Error fetching address: ", error);
      }
    } else {
      alert("Latitude and Longitude not available yet.");
    }
  };

  return (
    <>
      <h1>Current Location</h1>
      <p>Latitude: {latitude || "Loading..."}</p>
      <p>Longitude: {longitude || "Loading..."}</p>
      <button onClick={getLocation}>Get Location</button>
      <button onClick={getUserAddress}>Get User Address</button>
      {address && <p>Address: {address}</p>}
      {/* Optional: Display GPS-specific coordinates */}
      {GPSLatitude && GPSLongitude && (
        <>
          <h2>GPS Specific Data</h2>
          <p>GPS Latitude: {GPSLatitude}</p>
          <p>GPS Longitude: {GPSLongitude}</p>
        </>
      )}
    </>
  );
};

export default GPS;
