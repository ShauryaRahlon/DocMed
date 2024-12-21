import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar/Navbar.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import MainHome from './Components/MainHome.jsx'
import Footer from "./Footer/Footer.jsx";
import Signup from "./Pages/Signup.jsx";
import DoctorListing from "./Pages/DoctorListing.jsx";
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctorlisting" element={<DoctorListing />} />

        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
