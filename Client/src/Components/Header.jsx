import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styling/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in (e.g., by checking a token in localStorage)
        const token = localStorage.getItem('authToken');
        console.log(token);
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        // Show a success toast
        toast.success("Logged Out", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        // Delay logout actions slightly to allow the toast to display
        setTimeout(() => {
            localStorage.removeItem('authToken');
            setIsLoggedIn(false);
            navigate('/'); // Redirect to the homepage or another route
        }, 3000);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={`headers ${isMenuOpen ? 'show-menu' : ''}`}>
            <header className="header1">
                <div className="header1-container">
                    <a href="/" className="logo">
                        <img
                            src="/public/Logo3.png"
                            alt="DocPulse Logo"
                            className="logo-image"
                        />
                        <h1 className="logo-text">DocMed</h1>
                    </a>
                    <button className="mobile-menu-button" onClick={toggleMenu}>
                        Menu
                    </button>
                    <nav className="header1-nav">
                        <Link to="/" className="nav-link Home">
                            Home
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link to="/map" className="nav-link Map">
                                    Locate Hospitals
                                </Link>
                                <Link to="/review" className="nav-link Review">
                                    Ask From AI
                                </Link>
                                <button onClick={handleLogout} className="nav-link Logout">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link Login">
                                    Login
                                </Link>
                                <Link to="/signup" className="nav-link Signup">
                                    Signup
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>
            <ToastContainer />
        </div>
    );
};

export default Header;
