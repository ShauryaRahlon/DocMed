import React from 'react';
import { Check, Clock } from 'lucide-react';
import '../Styling/DoctorListing.css';

const DoctorCard = ({ doctor }) => {
    return (
        <div className="doctor-card-new">
            <div className="doctor-container-new">
                {/* Doctor Image and Logo */}
                <div className="image-container-new">
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="doctor-image-new"
                    />
                </div>

                {/* Doctor Information */}
                <div className="info-container-new">
                    <div className="header-container-new">
                        <div>
                            <h2 className="doctor-name-new">{doctor.name}</h2>
                            <p className="specialization-new">{doctor.specialization}</p>
                            <p className="experience-new">
                                {doctor.experience} years experience overall
                            </p>
                        </div>
                        <div className="availability-new">
                            <Clock className="clock-icon-new" />
                            <span>Available Today</span>
                        </div>
                    </div>

                    {/* Location and Practice */}
                    <div className="location-container-new">
                        <p className="location-new">
                            {doctor.location} • {doctor.practices.join(' • ')}
                        </p>
                        <p className="fee-new">
                            ₹{doctor.consultationFee} Consultation fee at clinic
                        </p>
                    </div>

                    {/* Ratings and Stories */}
                    <div className="footer-container-new">
                        <div className="ratings-container-new">
                            <div className="rating-badge-new">
                                <span>{doctor.rating}%</span>
                            </div>
                            <a href="#" className="patient-stories-new">
                                {doctor.patientStories} Patient Stories
                            </a>
                        </div>
                        <button className="book-button-new">
                            Book Clinic Visit
                            <div className="no-fee-new">No Booking Fee</div>
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
            location: "Sector 28, Gurgaon",
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
            location: "Sector 31, Gurgaon",
            practices: ["Rohini Dental Care", "1 more"],
            consultationFee: 500,
            rating: 98,
            patientStories: 10,
            image: "https://imgs.search.brave.com/PkUuwcduTgOAltXZNMI0ItfzkfVCWw0CKCVSJ6dmpN0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NzUwNzIwOS9waG90/by9wb3J0cmFpdC1v/Zi1pbmRpYW4tZmVt/YWxlLWRvY3Rvci1z/dG9jay1waG90by5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/bUktTVBHQV9iSEJM/SzlENzd2OHNoWU9a/ZEk3UHFubGgyX3hK/RTAwdFVITT0"
        },
        {
            name: "Dr. Himanshu Saklani",
            specialization: "Gyanecologist",
            experience: 10,
            location: "Sector 28, Gurgaon",
            practices: ["Dantkriti", "2 more"],
            consultationFee: 350,
            rating: 99,
            patientStories: 1141,
            image: "https://imgs.search.brave.com/gEJSBgjf2EAYonT6EsXx8-YS9adl6o_sfZ7ncScbCCc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zbWlsaW5nLWlu/ZGlhbi1tYWxlLWRv/Y3Rvci1ibHVlLXVu/aWZvcm0tc2l0dGlu/Zy1kZXNrLXdpdGgt/bGFwdG9wXzExNjU0/Ny03Nzc2Ny5qcGc_/c2VtdD1haXNfaHli/cmlk"
        },
        {
            name: "Dr. Sarthak Ahluwalia",
            specialization: "Cardiologist",
            experience: 16,
            location: "Sector 62, Gurgaon",
            practices: ["Rohini Dental Care", "1 more"],
            consultationFee: 500,
            rating: 98,
            patientStories: 10,
            image: "https://imgs.search.brave.com/voqgWdNx3nfAdvfxJIFYrljNOjXounW5evGcoTFw_D0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcGku/cmxqZS5uZXQvYWNv/cm4vYXJ0d29yay9z/aXplL2luZGlhbmRv/Y3Rvcl9zcjAxX2Vw/MDFfc3BsYXNoP3c9/NTAw"
        }
    ];

    return (
        <div className="listing-container-new">
            {/* Header */}
            <div className="header-new">
                <Check className="check-icon-new" />
                <p>Book appointments with minimum wait-time & verified doctor details</p>
            </div>

            {/* Doctor Cards */}
            <div className="cards-container-new">
                {doctors.map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
};

export default DoctorListing;
