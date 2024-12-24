import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styling/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.status === 201) {
        const receivedToken = response.data.token;
        localStorage.setItem("authToken", receivedToken);

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/");
        }, 1500); // Redirect after 3 seconds
      } else {
        toast.error(response.data.message || "Login failed. Try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        toast.error(
          error.response.data.message || "Login failed. Try again.",
          {
            position: "top-right",
            autoClose: 1500,
          }
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
      <div className="login-container">
        <div
          style={{
            display: "flex",
            gap: "15px",
            justifyItems: "center",
            alignItems: "center",
            margin: "10px 0 20px 10px",
          }}
        >
          <img
            src="/public/Logo3.png"
            alt="DocMed icon"
            style={{ width: "60px", height: "60px", borderRadius: "50px" }}
          />
          <h2 style={{ fontSize: "30px", color: "white" }}>DocMed</h2>
        </div>
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="email" style={{ marginBottom: "10px" }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              className="input"
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
          <div className="password" style={{ marginBottom: "10px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              className="input"
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
          <button
            className="submit-btn"
            type="submit"
            style={{ padding: "10px 20px" }}
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
