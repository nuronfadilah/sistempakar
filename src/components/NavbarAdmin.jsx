import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // atau token yang kamu pakai
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/adminDasboard">Dashboard</Link></li>
        <li><Link to="/kondisiPage"> Data Kondisi</Link></li>
        <li><Link to="/admin/aturan">Data Aturan</Link></li>
        <li><Link to="/pengetahuan"> Basis Pengetahuan</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
}

export default NavbarAdmin;
