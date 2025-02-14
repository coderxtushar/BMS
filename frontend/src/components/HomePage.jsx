import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import logoInvertis from '../assets/logoInvertis.png';

const HomePage = () => {
  return (
    <div className="container">
      <header className="header">
      <div className="logo-title">
          <Link to="https://www.invertisuniversity.ac.in/" className="logo-link">
            <img 
              src={logoInvertis} 
              alt="Invertis University Logo" 
              className="university-logo"
            />
          </Link>
          <h1>College Bus Parking Locator</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="#about">About Project</Link></li>
            <li><Link to="#team">Our Team</Link></li>
            <li><Link to="#testimonials">Testimonials</Link></li>
            <li><Link to="#contact">Contact Us</Link></li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <h2>Find Your Bus Location Easily</h2>
        <p>Login to check where your bus is parked in the college.</p>
        <div className="button-container">
          <Link to="/register" className="student-login">Register</Link>
          <Link to="/login" className="admin-login">Login</Link>
        </div>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} College Bus Parking Locator. Invertis University Bareilly.</p> 
      </footer>
    </div>
  );
};

export default HomePage;