import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Styling/Carousel.css';

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
    };

    const carouselItems = [
        {
            id: 1,
            image: "https://imgs.search.brave.com/fkldE37vmMUWrEF8DAvFGI5REIs9oi0ySGlNcVcrtMs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zb3V0/aC1pbmRpYW4tZG9j/dG9yLXNtaWxpbmct/cG9ydHJhaXQtMzYy/NTYwOTQuanBn",
            caption: "Sumit Mishra",
            review: "I have a past experience of 20+ years and saved countless number of people.",
        },
        {
            id: 2,
            image: "https://imgs.search.brave.com/QanA3worLV3HPgMe_4kSMsYmBBih6Qe2sgtHME70gbw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jbG9zZXVwLXNo/b3Qtc291dGgtYXNp/YW4tZmVtYWxlLWRv/Y3Rvci1wb3Npbmct/d2l0aC1oZXItaGFu/ZHMtY3Jvc3NlZF82/NjUzNDYtNDIyNTMu/anBnP3NlbXQ9YWlz/X2h5YnJpZA",
            caption: "Geeta Mishra",
            // add a doctor description
            review: "I am a passionate doctor who has been treating patients for over 10 years. I specialize in treating a wide range of medical conditions.",
        },
        {
            id: 3,
            image: "https://imgs.search.brave.com/nzgZyE2HuRVCrsnINLDrQZo7D5O1DIaJ9eLUSbLw5Uw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zbWlsaW5nLW1h/dHVyZS1pbmRpYW4t/bWFsZS1kb2N0b3It/dW5pZm9ybS1wb3Np/bmctd2hpdGUtYmFj/a2dyb3VuZF8xMTY1/NDctODEyODAuanBn/P3NlbXQ9YWlzX2h5/YnJpZA",
            caption: "",
            review: "With over 10 years of experience, Dr. Carter specializes in treating a wide range of medical conditions. She is known for her compassionate care and patient-centered approach.",
        },
    ];

    return (
        <div className="senior-container">

            <div className="carousel-container">
                <Slider {...settings}>
                    {carouselItems.map((item) => (
                        <div key={item.id} className="carousel-slide">
                            <div className="slide-image-container">
                                <img
                                    src={item.image}
                                    alt={item.caption}
                                    className="slide-image"
                                />
                                <div className="slide-hover-review">
                                    <p>{item.review}</p>
                                </div>
                            </div>
                            <h3 className="slide-caption">{item.caption}</h3>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;
