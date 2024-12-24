import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../Styling/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [receivedToken, setToken] = useState("");

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

      const receivedToken = response.data.token;
      console.log(receivedToken);
      setToken(receivedToken);
      localStorage.setItem('authToken', receivedToken);

      if (response.status === 201) {
        toast.success("Login successful!");
        console.log("Navigating to home page");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Try again."
        );
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An error occurred. Please check your connection.");
      }
    }
  };

  return (
    <div className="main-container">
      <div className='login-container'>
        <div style={{ display: "flex", gap: "15px", justifyItems: "center", alignItems: "center", margin: "10px 0 20px 10px" }}>
          <img src="/public/Logo3.png" alt="DocMed icon" style={{ width: "60px", height: "60px", borderRadius: "50px" }} />
          <h2 style={{ fontSize: "30px", color: "white" }}>DocMed</h2>
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
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
                backgroundColor: "#f9f9f9",
                transition: "border-color 0.3s, box-shadow 0.3s",
                outline: "none",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
              }}
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
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    backgroundColor: "#f9f9f9",
    transition: "border-color 0.3s, box-shadow 0.3s",
    outline: "none",
  }}
  onFocus={(e) => {
    e.target.style.borderColor = "#007bff";
    e.target.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
  }}
  onBlur={(e) => {
    e.target.style.borderColor = "#ccc";
    e.target.style.boxShadow = "none";
  }}
/>

          </div>
          <button className='submit-btn' type="submit" style={{ padding: "10px 20px" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
