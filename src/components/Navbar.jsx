import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Sistem Pakar Waris</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/Konsultasi"> Konsultasi</Link></li>
        <li><Link to="/tentang">Tentang</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
