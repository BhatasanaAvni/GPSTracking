import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  authDomain: "gpstracking-d48b6.firebaseapp.com",
  projectId: "gpstracking-d48b6",
  storageBucket: "gpstracking-d48b6.appspot.com",
  messagingSenderId: "880756112699",
  databaseURL: "https://gpstracking-d48b6-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
