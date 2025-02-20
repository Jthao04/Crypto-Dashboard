import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/crypto-market" className="navbar-link">Crypto</Link>
        </li>
        <li className="navbar-item">
          <Link to="/stock-market" className="navbar-link">Stock</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;