const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<your-database-name>.firebaseio.com", // Replace with your Firebase DB URL
});

const db = admin.database();
const app = express();

app.use(bodyParser.json());

// Endpoint to update driver's location
app.post("/update-location", (req, res) => {
  const { driverId, lat, lng, mobileNumber } = req.body;

  if (!driverId || !lat || !lng || !mobileNumber) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const driverRef = db.ref(`drivers/${driverId}`);
  driverRef.update({ coordinates: { lat, lng }, mobileNumber }, (error) => {
    if (error) {
      return res.status(500).send({ error: "Failed to update location" });
    }
    res.send({ success: true, message: "Location updated successfully" });
  });
});

// Endpoint to fetch driver data
app.get("/drivers", (req, res) => {
  const driversRef = db.ref("drivers");
  driversRef.once("value", (snapshot) => {
    if (!snapshot.exists()) {
      return res.status(404).send({ error: "No drivers found" });
    }
    res.send(snapshot.val());
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
