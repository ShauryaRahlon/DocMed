import React from 'react'
import Lottie from 'react-lottie';
import HeartBeat from  './HeartBeat.json';

function AniHeartBeat() {
    const hearbeat = {
        loop: true, // Animation loops infinitely
        autoplay: true, // Animation starts automatically
        animationData: HeartBeat, // Your JSON file
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
        },
      };
  return (
    <>
     <div>
          <Lottie options={hearbeat} height={100} width={100} />
    </div>
    </>
  )
}

export default AniHeartBeat
