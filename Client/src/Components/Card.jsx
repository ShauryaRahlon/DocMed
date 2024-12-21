import React, { useState } from 'react';
import '../Styling/Card.css';
import AniDoc from './AniDoc.jsx';
import AniCalendar from './AniCalander.jsx';
import AniHeartBeat from './AniHeartBeat';
import AniAi from './AniAi.jsx';

function Card() {
  const [cards] = useState([
    {
      title: 'Card 1',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque soluta perspiciatis aliquid, modi, quibusdam voluptatem iusto exercitationem porro facilis animi et dolorum ad.',
    },
    {
      title: 'Card 2',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque soluta perspiciatis aliquid, modi, quibusdam voluptatem iusto exercitationem porro facilis animi et dolorum ad.',
    },
    {
      title: 'Card 3',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque soluta perspiciatis aliquid, modi, quibusdam voluptatem iusto exercitationem porro facilis animi et dolorum ad.',
    },
    {
      title: 'Card 4',
      content:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque soluta perspiciatis aliquid, modi, quibusdam voluptatem iusto exercitationem porro facilis animi et dolorum ad.',
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
                return ( // Add the missing return statement
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
                        <h3>{card.title}</h3>
                        <p>{card.content}</p>
                        <button className='btn'>Book</button>
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
