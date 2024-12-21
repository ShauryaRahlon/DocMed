import { useState } from 'react';
import Calendar from './Calendar.json'
import HeartBeat from './HeartBeat.json';
import Doctor from './Doctor.json';
import Ai from './Ai.json'
import Lottie from 'react-lottie';


function Animation() {
  const [count, setCount] = useState(0);

  const calendar = {
    loop: true, // Animation loops infinitely
    autoplay: true, // Animation starts automatically
    animationData: Calendar, // Your JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
    },
  };

  const hearbeat = {
    loop: true, // Animation loops infinitely
    autoplay: true, // Animation starts automatically
    animationData: HeartBeat, // Your JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
    },
  };
  const doctor = {
    loop: true, // Animation loops infinitely
    autoplay: true, // Animation starts automatically
    animationData: Doctor, // Your JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
    },
  };
  const ai = {
    loop: true, // Animation loops infinitely
    autoplay: true, // Animation starts automatically
    animationData: Ai, // Your JSON file
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
    },
  };

  return (
    <>
      {/* Container for animations */}
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '20px' }}>
        {/* Calendar Animation */}
        <div>
          <Lottie options={calendar} height={200} width={200} />
        </div>

        {/* HeartBeat Animation */}
        <div>
          <Lottie options={hearbeat} height={200} width={200} />
        </div>

        {/* Doctor Animation */}
        <div>
          <Lottie options={doctor} height={200} width={200} />
        </div>

        {/* Ai Animation */}
        <div>
          <Lottie options={ai} height={200} width={200} />
        </div>
      </div>
    </>
  );
}

export default Animation;
