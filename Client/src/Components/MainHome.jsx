import React, { useState } from 'react';
import '../Styling/MainHome.css';
// import '../Styling/Card.css'
import Card from './Card.jsx';
import { Link } from 'react-router-dom';
import Login from '../Pages/Login.jsx';
import Signup from '../Pages/Signup.jsx';


function MainHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Hamburger Menu Icon */}
          <div
            className="hamburger-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>

          {/* Navbar Items */}
          <div
            className={`navbar-items ${menuOpen ? 'show' : 'hide'}`}
          >

            <div>
              {/* <button className="login-button">Login</Link></button> */}
              <Link to="/login" className="login-button">
                Login
              </Link>
            </div>
            <div>
              {/* <button className="login-button">Login</Link></button> */}
              <Link to="/signup" className="login-button">
                Signup
              </Link>
            </div>
          </div>
        </div >
      </nav >

      {/* Header */}
      < header className="header" >
        <div className="header-container">
          <a href="/" className="logo">
            <img
              src="/public/Logo-icon.webp"
              alt="DocPulse Logo"
              className="logo-image"
            />
            <h1 className="logo-text">DocMed</h1>
          </a>
          <nav className="header-nav">
            <Link to="/" className="nav-link Home">
              Home
            </Link>
            <Link to="/map" className="nav-link Map">
              Locate Hospitals
            </Link>
            <Link to="/review" className="nav-link Review">
              Ask From AI
            </Link>
          </nav>
        </div>
      </header >

      {/* Main Section */}
      < main className="main" >
        <div className="main-content">
          <h2 className="main-title">ONLINE DOCTOR APPOINTMENT APP</h2>
        </div>
      </main >

      <main className='main2'>
        <div className='image-container'>
          <h2 className='main2-heading'>Doctor Appointment Booking App for Patients</h2>
          <h3 className='main2-question'>What you can Do?</h3>
          <img className='features-image' src="/public/Meet Doctor (1).png" alt="Features Image" />
        </div>
      </main>

      <Card />
    </>
  );
}

export default MainHome;
