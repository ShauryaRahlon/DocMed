import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      console.log(response);

      // Uncomment and use response data as needed
      // if (response.status === 200) {
      //   setMessage("Login successful: " + JSON.stringify(response.data));
      // } else {
      //   setMessage("Error: " + (response.data.message || "Login failed. Try again."));
      // }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.response) {
        // Server responded with a status other than 2xx
        setMessage(
          "Error: " +
            (error.response.data.message || "Login failed. Try again.")
        );
      } else if (error.request) {
        // Request was made but no response received
        setMessage("No response from server. Please try again later.");
      } else {
        // Something else happened
        setMessage("An error occurred. Please check your connection.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px" }}>
        <Link to='/login'>
             Submit
        </Link>
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
