import React from "react";
import "../Styling/OnlineCard.css"; // Import the external CSS file

const OnlineCard = () => {
    return (
        <div className="container">
            <div className="text-content">
                <h1 className="title">
                    Health<span className="emphasis">care</span>
                </h1>

                <div className="features">
                    <div className="feature">
                        <span className="icon">💕</span>Reduce HbA1c
                    </div>
                    <div className="feature">
                        <span className="icon">✏️</span>No More Medications
                    </div>
                </div>
                <button className="buttons">
                    Book Consultation <span className="arrow">→</span>
                </button>
            </div>
            <div className="image-section">
                <img
                    src="/Docst.webp"
                    alt="Doctor"
                    className="doctor-image"
                />
            </div>
        </div>
    );
};

export default OnlineCard;
