import React from 'react'
import { useState } from 'react';
import Doctor from './Doctor.json';
import Lottie from 'react-lottie';

function AniDoc() {
    const doctor = {
        loop: true, // Animation loops infinitely
        autoplay: true, // Animation starts automatically
        animationData: Doctor, // Your JSON file
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
        },
      };
  return (
    <div>
          <Lottie options={doctor} height={100} width={100} />
    </div>
  )
}

export default AniDoc
