// src/components/Navbar.js
import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2E6F57' }}>
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1" href="/">UGRUB</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                <label className="form-check-label" for="flexSwitchCheckDefault">Dark</label>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="index.html">Home</a>
            </li> 
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
