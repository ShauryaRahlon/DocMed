import React from 'react'
import { useState } from 'react';
import Calendar from './Calendar.json';
import Lottie from 'react-lottie';

function AniCalendar() {
    const calendar = {
        loop: true, // Animation loops infinitely
        autoplay: true, // Animation starts automatically
        animationData: Calendar, // Your JSON file
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice', // Adjust rendering behavior
        },
      };
  return (
    <div>
          <Lottie options={calendar} height={100} width={100} />
    </div>
  )
}

export default AniCalendar
