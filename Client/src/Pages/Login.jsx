import React, { useState } from "react";
import '../Styling/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful: " + JSON.stringify(data));
      } else {
        alert("Error logging in. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check your connection.");
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
        <div className='username' style={{ marginBottom: "10px" }}>
          <label htmlFor='username'>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter Username"
            style={{ width: "100%", padding: "8px", borderRadius: "5px"}}
          />
        </div>
        <div className='phonenumber' style={{ marginBottom: "10px" }}>
          <label htmlFor='phone'>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter Phonenumber"
            style={{ width: "100%", padding: "8px", borderRadius: "5px"}}
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
