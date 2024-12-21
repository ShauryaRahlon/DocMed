import React from 'react'
import Lottie from 'react-lottie';
import Ai from './Ai.json';

function AniAi() {
    const ai = {
        loop: true, // Animation loops infinitely
        autoplay: true, // Animation starts automatically
        animationData: Ai, // Your JSON file
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
        },
      };
  return (
    <div>
    <Lottie options={ai} height={100} width={100} />
    </div>
  )
}

export default AniAi
