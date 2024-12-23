import React from 'react';
import '../Styling/OnlineCard.css';
const OnlineCard = () => {
    return (
        <div className="container_old">
            <div className="text-content_old">
                <h1 className="title_old">Healthcare</h1>
                <div className="features_old">
                    <div className="feature_old">
                        <span>⚡</span>
                        <span>Reduce HbA1c</span>
                    </div>

                    <div className="feature_old">
                        <span>🌿</span>
                        <span>No More Medications</span>
                    </div>
                </div>

                <p className="consultation-text_old">
                    IF YOU ARE LOOKING FOR A CONSULTATION THIS IS THE RIGHT PLACE FOR U
                </p>

                <button className="buttons_old">
                    Book Consultation
                    <span className="arrow_old">→</span>
                </button>
            </div>

            <div className="image-section_old">
                <img
                    src="/Docst.webp"
                    alt="Healthcare Professional"
                    className="doctor-image_old"
                />
            </div>
        </div>
    );
};

export default OnlineCard;
