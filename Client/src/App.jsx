import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./Navbar/Navbar.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import MainHome from './Components/MainHome.jsx'
import Footer from "./Footer/Footer.jsx";
function App() {

  return (
    <>
      <Router>
      <div>
        <MainHome />
        {/* <Navbar /> */}

        <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />

        </Routes>
        
        <Footer />
      </div>
    </Router>
    </>
  )
}

export default App
