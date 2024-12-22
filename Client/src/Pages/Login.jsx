import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styling/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(response);

      if (response.status === 201) {
        console.log("Navigating to home page");
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(
          "Error: " + (response.data.message || "Login failed. Try again.")
        );
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        setMessage(
          "Error: " +
            (error.response.data.message || "Login failed. Try again.")
        );
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An error occurred. Please check your connection.");
      }
    }
  };

  return (
    <div className="main-container">
      <div className='login-container'>
        <div style={{display:"flex", gap:"15px", justifyItems:"center", alignItems:"center", margin:"10px 0 20px 10px"}}>
          <img src="/public/Logo-icon.webp" alt="DocMed icon" style={{width:"60px", height: "60px", borderRadius:"50px"}} />
          <h2 style={{fontSize:"30px", color:"white"}}>DocMed</h2>
        </div>
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='email' style={{ marginBottom: "10px" }}>
            <label htmlFor='email'>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <div className='password' style={{ marginBottom: "10px" }}>
            <label htmlFor='password'>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
            />
          </div>
          <button className='submit-btn' type="submit" style={{ padding: "10px 20px" }}>
            Submit
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;