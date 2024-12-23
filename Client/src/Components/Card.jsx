import React, { useState } from 'react';
import '../Styling/Card.css';
import AniDoc from './AniDoc.jsx';
import AniCalendar from './AniCalander.jsx';
import AniHeartBeat from './AniHeartBeat';
import AniAi from './AniAi.jsx';
import { Link } from 'react-router-dom';
import DoctorListing from '../Pages/DoctorListing.jsx';

function Card() {
  const [cards] = useState([
    {
      title: 'Book Appointment with Doctors Easily',
      content:
        'DocMed enables patients to search for top doctors in the locality and book confirmed appointments.',
    },
    {
      title: 'Consult Online with Doctor',
      content:
        'Why take time off work to visit a doctor? Try our convenient video consultation service instead.',
    },
    {
      title: 'Manage Your Health Records with The Best Doctor Appointment App',
      content:
        'Book appointments, consult doctors, and manage prescriptions all in one place.',
    },
    {
      title: 'AI Buddy',
      content:
        'Your personal health assistant, bringing expert care and convenience to your fingertips.',
    },
  ]);

  return (
    <>
      <div>
        <section>
          <div className="card-container">
            <h1>Our Features</h1>
            <div className="cards">
              {cards.map((card, i) => {
                return ( 
                  <div key={i} className="card">
                    {i === 0 && (
                <div className="animation-container">
                  <AniCalendar />
                </div>
              )}
              {i === 1 && (
                <div className="animation-container">
                     <AniDoc />
                </div>
              )}
              {i === 2 && (
                <div className="animation-container">
                     <AniHeartBeat />
                </div>
              )}
              {i === 3 && (
                <div className="animation-container">
                     <AniAi />
                </div>
              )}
                    <div>
                        <h3 className='card-title'>{card.title}</h3>
                        <p className='card-content'>{card.content}</p>
                        {/* <button className='btn'>
                          <Link to="/DoctorListing">
                          Book</Link>
                        </button> */}
                        <button className='btn'>
                        {i === 0 && (
                            <Link to="/DoctorListing">Book</Link>
                          )}
                          {i === 1 && (
                            <Link to="/Connect">Book</Link>
                          )}
                          {i === 2 && (
                          <Link to="/">Book</Link>
                          )}
                          {i === 3 && (
                            <Link to="/Review">Book</Link>
                          )}
                        </button>
                    </div>
              </div>

                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Card;
