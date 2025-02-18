import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === "success") {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Sign Up</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required style={inputStyle} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />

        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/cleaner/login">Login here</a></p>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#00AEEF",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const messageStyle = {
  color: "red",
  fontWeight: "bold",
};

export default Signup;
