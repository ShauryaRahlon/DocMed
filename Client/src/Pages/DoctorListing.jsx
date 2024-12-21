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
                            src="https://as2.ftcdn.net/v2/jpg/09/87/58/25/1000_F_987582510_68UXWXPtFrFdQJSJbcuSPUyb5nF6Inw3.jpg"
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
            image: "https://imgs.search.brave.com/1r_lNH1MoMfa0LnnfNlVq2dYfaoN_Kftaf0O6djlVII/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQ1LzkyLzEx/LzM2MF9GXzI0NTky/MTE5NV84YnRNS001/VHFMVlVjeFZoY0pv/YnZJbjlIdEFPaFNU/Zy5qcGc"
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
            image: "https://imgs.search.brave.com/PkUuwcduTgOAltXZNMI0ItfzkfVCWw0CKCVSJ6dmpN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NzUwNzIwOS9waG90/by9wb3J0cmFpdC1v/Zi1pbmRpYW4tZmVt/YWxlLWRvY3Rvci1z/dG9jay1waG90by5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/bUktTVBHQV9iSEJM/SzlENzd2OHNoWU9a/ZEk3UHFubGgyX3hK/RTAwdFVITT0"
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