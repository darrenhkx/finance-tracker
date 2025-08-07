import React from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="nav-bar">
      <img src={logo} alt="logo" className="navbar-logo"/>
      <div className="directories">
        <p onClick={() => navigate('/home')} className="nav-link">Home</p>
        <p onClick={() => navigate('/manage-budget')} className="nav-link">Manage Budget</p>
        <p onClick={() => navigate('/manage-account')} className="nav-link">Manage Account</p>
        <p onClick={handleLogout} className="nav-link">Log Out</p>
      </div>
    </div>
  );
};

export default NavBar;