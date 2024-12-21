import React from 'react';
import { Check, Clock } from 'lucide-react';
import '../Styling/DoctorListing.css';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="doctor-card">
            <div className="doctor-container">
                {/* Doctor Image and Logo */}
                <div className="image-container">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="doctor-image"
                    />
                    <div className="logo-container">
                        <img
                            src="/api/placeholder/80/24"
                            alt="Practo Logo"
                            className="practo-logo"
                        />
                    </div>
                </div>

                {/* Doctor Information */}
                <div className="info-container">
                    <div className="header-container">
                        <div>
                            <h2 className="doctor-name">{doctor.name}</h2>
                            <p className="specialization">{doctor.specialization}</p>
                            <p className="experience">
                                {doctor.experience} years experience overall
                            </p>
                        </div>
                        <div className="availability">
                            <Clock className="clock-icon" />
                            <span>Available Today</span>
                        </div>
                    </div>

                    {/* Location and Practice */}
                    <div className="location-container">
                        <p className="location">
                            {doctor.location} • {doctor.practices.join(' • ')}
                        </p>
                        <p className="fee">
                            ₹{doctor.consultationFee} Consultation fee at clinic
                        </p>
                    </div>

                    {/* Ratings and Stories */}
                    <div className="footer-container">
                        <div className="ratings-container">
                            <div className="rating-badge">
                                <span>{doctor.rating}%</span>
                            </div>
                            <a href="#" className="patient-stories">
                                {doctor.patientStories} Patient Stories
                            </a>
                        </div>
                        <button className="book-button">
                            Book Clinic Visit
                            <div className="no-fee">No Booking Fee</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DoctorListing = () => {
    const doctors = [
        {
            name: "Dr. Himanshu Gupta",
            specialization: "Dentist",
            experience: 15,
            location: "Gurgaon Sector 28, Gurgaon",
            practices: ["Dantkriti", "2 more"],
            consultationFee: 650,
            rating: 99,
            patientStories: 114,
            image: "/images/Doc1.webp"
        },
        {
            name: "Dr. Aishna Sharma",
            specialization: "Dentist",
            experience: 16,
            location: "Gurgaon Sector 31, Gurgaon",
            practices: ["Rohini Dental Care", "1 more"],
            consultationFee: 500,
            rating: 98,
            patientStories: 10,
            image: "/images/Doc2.webp"
        }
    ];

    return (
        <div className="listing-container">
            {/* Header */}
            <div className="header">
                <Check className="check-icon" />
                <p>Book appointments with minimum wait-time & verified doctor details</p>
            </div>

            {/* Doctor Cards */}
            <div className="cards-container">
                {doctors.map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DoctorListing;