import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        // Clear the token and update state
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        navigate('/');
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
                            src="/public/Logo-icon.webp"
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
                            <Link to="/login" className="nav-link Login">
                                Login
                            </Link>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;