import React from 'react';
import '../Styling/OnlineCard.css';
const HealthcareBanner = () => {
    return (
        <div className="container">
            <div className="text-content">
                <h1 className="title">Healthcare</h1>

                <div className="features">
                    <div className="feature">
                        <span>⚡</span>
                        <span>Reduce HbA1c</span>
                    </div>

                    <div className="feature">
                        <span>🌿</span>
                        <span>No More Medications</span>
                    </div>
                </div>

                <p className="consultation-text">
                    IF YOU ARE LOOKING FOR A CONSULTATION THIS IS THE RIGHT PLACE FOR U
                </p>

                <button className="buttons">
                    Book Consultation
                    <span className="arrow">→</span>
                </button>
            </div>

            <div className="image-section">
                <img
                    src="/Docst.webp"
                    alt="Healthcare Professional"
                    className="doctor-image"
                />
            </div>
        </div>
    );
};

export default HealthcareBanner;

