import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/crypto-market" className="navbar-link">Crypto</Link>
        </li>
        <li className="navbar-item">
          <Link to="/stock-market" className="navbar-link">Stock</Link>
        </li>
        <li className="navbar-item">
          <button onClick={onLoginClick} className="btn btn-primary navbar-link">Login</button>
        </li>
        <li className="navbar-item">
          <button onClick={onRegisterClick} className="btn btn-secondary navbar-link">Register</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;