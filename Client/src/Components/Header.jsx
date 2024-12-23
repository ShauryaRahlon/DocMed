import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <Link to="/map" className="nav-link Map">
                            Locate Hospitals
                        </Link>
                        <Link to="/review" className="nav-link Review">
                            Ask From AI
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;