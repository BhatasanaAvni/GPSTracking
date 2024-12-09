import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import "leaflet/dist/leaflet.css";
import AddDriver from "./AddDriver";
import DriverList from "./DriverList";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar with fixed width */}
        <div className="w-[200px] bg-gray-200">
          <Sidebar />
        </div>
        {/* Dashboard with remaining width */}
        <div className=" w-[1450px] overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/drivers" element={<DriverList/>} />
            <Route path="/add-driver" element={<AddDriver/>} />
            <Route path="/live-tracking" element={<div>Live Tracking Page</div>} />
            <Route path="/history-tracking" element={<div>History Tracking Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
