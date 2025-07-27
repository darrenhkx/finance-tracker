import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import UserHome from "./pages/UserHome/UserHome.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";

// Components
import NavBar from "./components/NavBar/NavBar.jsx";

const App = () => {
  return (
    <Router>
      {/*<Navbar /> */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;