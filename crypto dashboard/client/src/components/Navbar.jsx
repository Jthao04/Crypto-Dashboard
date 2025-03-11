import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; 

function Navbar({ onLoginClick, onRegisterClick }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MarketWatch</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/crypto-market" className="nav-link">Crypto</Link>
            </li>
            <li className="nav-item">
              <Link to="/stock-market" className="nav-link">Stock</Link>
            </li>
            <li className="nav-item">
              <button onClick={onLoginClick} className="btn btn-dark nav-link">Login</button>
            </li>
            <li className="nav-item">
              <button onClick={onRegisterClick} className="btn btn-dark nav-link">Register</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;