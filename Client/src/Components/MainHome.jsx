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
            <div className="navbar-item">
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
                  d="M2.25 6.75A3 3 0 015.25 4h.267c.583 0 1.102.34 1.34.867l1.056 2.434c.2.46.11 1-.233 1.353l-.58.58a12.083 12.083 0 006.179 6.179l.58-.58c.353-.344.894-.434 1.353-.233l2.434 1.056c.527.238.867.757.867 1.34v.267a3 3 0 01-2.75 3h-.5C7.798 21 3 16.202 3 10.75v-.5a3 3 0 01-.75-2.5z"
                />
              </svg>
              <span>+1-234-567-890</span>
            </div>

            <div className="navbar-item">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.5L2.25 6.75"
                />
              </svg>
              <span>example@email.com</span>
            </div>

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
            <Link to="/contact" className="nav-link ContactUs">
              Contact Us
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
          <img className='features-image' src="https://docpulse.com/wp-content/uploads/2020/01/meet-my-doctor-1-1024x441.png" alt="Features Image" />
        </div>
      </main>

      <Card />
    </>
  );
}

export default MainHome;
