import React from "react";
import "./RegisterPage.css";
import logo from "../../assets/logo.png";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <form className="register-form">
        <img src={logo} alt="logo" className="logo" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" autoComplete="email" />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" autoComplete="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" autoComplete="new-password" />

        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;