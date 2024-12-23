import React, { useState } from 'react';
import '../Styling/MainHome.css';
// import '../Styling/Card.css'
import Card from './Card.jsx';
import { Link } from 'react-router-dom';
import Login from '../Pages/Login.jsx';
import Signup from '../Pages/Signup.jsx';
import Header from './Header.jsx';
import Carousel from './Carousel.jsx';
import OnlineCard from './OnlineCard.jsx';


function MainHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header />
      {/* Main Section */}
      < main className="main" >
        <div className="main-content">
          {/* <h2 className="main-title">ONLINE DOCTOR APPOINTMENT APP</h2> */}
          <OnlineCard />
        </div>
      </main >

      <main className='main2'>
        <div className='image-container'>
          <h2 className='main2-heading'>Doctor Appointment Booking App for Patients</h2>
          <h3 className='main2-question'>What you can Do?</h3>
          <img className='features-image' src="./Meet Doctor (1).png" alt="Features Image" />
        </div>
      </main>
      <Card />

      <Carousel />

    </>
  );
}

export default MainHome;
