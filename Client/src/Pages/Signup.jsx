import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styling/Signup.css';
import { Link } from "react-router-dom";
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
  });

  const [showOTPInput, setShowOTPInput] = useState(false);
  const [otp, setOTP] = useState("");
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://docmed-server.onrender.com/api/auth/signup",
        formData
      );

      if (response.status === 201) {
        setMessage("Please Verify OTP");
        setShowOTPInput(true);
        setUserEmail(formData.email); // Store email for OTP verification
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response) {
        setMessage(
          "Error: " +
          (error.response.data.error || "Signup failed. Try again.")
        );
      } else if (error.request) {
        setMessage("No response from server. Please try again later.");
      } else {
        setMessage("An error occurred. Please check your connection.");
      }
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://docmed-server.onrender.com/api/auth/verifyOTP",
        {
          email: userEmail,
          otp: otp
        }
      );

      if (response.status === 200) {
        setMessage("Email verified successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error);
      if (error.response) {
        setMessage(
          "Error: " +
          (error.response.data.error || "OTP verification failed. Try again.")
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
        <div style={{ display: "flex", gap: "15px", justifyItems: "center", alignItems: "center", margin: "10px 0 20px 10px" }}>
          <Link to='/'>
            <img src="./Logo3.png" alt="DocMed icon" style={{ width: "60px", height: "60px", borderRadius: "50px" }} />
          </Link>
          <Link to='/'>
            <h2 style={{ fontSize: "30px", color: "white" }}>DocMed</h2>
          </Link>
        </div>

        <h2 className="login-heading">Signup</h2>

        {!showOTPInput ? (
          // Signup Form
          <form onSubmit={handleSubmit}>

            <div className='username' style={{ marginBottom: "10px" }}>
              <label htmlFor='email'>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email"
                style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
                className="input"
              />
            </div>
            <div className='username' style={{ marginBottom: "10px" }}>
              <label htmlFor='username'>Username:</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
                placeholder="Enter Username"
                style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
                className="input"
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
                className="input"
              />
            </div>
            <button className='submit-btn' type="submit" style={{ padding: "10px 20px" }}>
              Submit
            </button>
          </form>
        ) : (
          // OTP Verification Form
          <form onSubmit={handleOTPSubmit}>
            <div className='username' style={{ marginBottom: "10px" }}>
              <label htmlFor='otp'>Enter OTP:</label>
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOTPChange}
                required
                placeholder="Enter OTP sent to your email"
                style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
              />
            </div>
            <button className='submit-btn' type="submit" style={{ padding: "10px 20px" }}>
              Verify OTP
            </button>
          </form>
        )}

        {message && (
          <p style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: message.includes("Error") ? "#ffebee" : "#e8f5e9",
            color: message.includes("Error") ? "#c62828" : "#2e7d32",
            borderRadius: "5px"
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;