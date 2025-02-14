import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this CSS for custom styles if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>College Bus Management System</h1>
      <ul className="nav-links">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;