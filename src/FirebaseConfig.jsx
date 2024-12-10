import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAL6QYP2vJ6nkjBA07tp-WiTZZKulygC0w",
  authDomain: "gpstracking-d48b6.firebaseapp.com",
  databaseURL: "https://gpstracking-d48b6-default-rtdb.firebaseio.com",
  projectId: "gpstracking-d48b6",
  storageBucket: "gpstracking-d48b6.firebasestorage.app",
  messagingSenderId: "880756112699",
  appId: "1:880756112699:web:66749a29b08d240d79cb1e",
  measurementId: "G-3VE48J8BPC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database for use in your project
const database = getDatabase(app);

export default database;
