import React, { useState } from "react";
import "./LoginPage.css";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error); // to inspect
        setMessage(error.detail || JSON.stringify(error));
        return;
      }

      const data = await response.json();
      console.log("Received login data:", data);
      localStorage.setItem("token", data.access_token); // store JWT
      localStorage.setItem("user", JSON.stringify({
        email: data.email,
        user_id: data.user_id
      }));
      setMessage(`Login successful! Welcome ${data.email}`);
      console.log("Received login data:", data);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="logo" className="logo"/>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <p className="login-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        <button type="submit">Login</button>
        <p className="login-link">
          Forgot your password? <Link to="/forgotpassword">Reset password</Link>
        </p>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;