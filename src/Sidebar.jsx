import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-200 p-4 h-full">
      <ul className="list-none p-0">
        <li>
          <Link to="/" className="text-lg font-semibold">
            Dashboard
          </Link>
        </li>
        <li className="mt-4">
          <span className="font-semibold">Driver's</span>
          <ul className="ml-4">
            <li>
              <Link to="/drivers" className="text-sm">
                Driver List
              </Link>
            </li>
            <li>
              <Link to="/add-driver" className="text-sm">
                Add Driver
              </Link>
            </li>
          </ul>
        </li>
        <li className="mt-4">
          <span className="font-semibold">Tracking</span>
          <ul className="ml-4">
            <li>
              <Link to="/live-tracking" className="text-sm">
                Live Tracking
              </Link>
            </li>
            <li>
              <Link to="/history-tracking" className="text-sm">
                History Tracking
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
