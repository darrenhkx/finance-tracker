import React from "react";
import "./LoginPage.css";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="login-page">
      <form className="login-form">
        <img src={logo} alt="logo" className="logo"/>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <p className="login-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <button type="submit">Login</button>
        <p className="login-link">
          Forgot your password? <Link to="/forgotpassword">Reset password</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;