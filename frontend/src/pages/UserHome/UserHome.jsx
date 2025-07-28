import React from "react";
import "./UserHome.css"; // make sure to create this file too
import NavBar from "../../components/NavBar/NavBar.jsx"

const UserHome = () => {
  return (
    <div>
      <NavBar />
      <div className="user-homepage">
        <h1>Welcome to Your Dashboard</h1>
        {/* Add charts, summaries, and recent activity here */}
      </div>
    </div>
  );
};

export default UserHome;