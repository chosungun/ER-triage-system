// src/components/layout/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">REM</span>
        <span className="navbar__tagline">X-ray Triage Assist</span>
      </div>

      <nav className="navbar__menu">
        <NavLink to="/" className="navbar__link">
          Home
        </NavLink>
        <NavLink to="/dashboard" className="navbar__link">
          Dashboard
        </NavLink>
        <NavLink to="/about" className="navbar__link">
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;