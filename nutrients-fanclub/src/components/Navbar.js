import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

  function Navbar() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#2E6F57' }}>
        <div className="container-fluid">
          <span className="navbar-brand" id="title"><h1>UGRUB</h1></span>
          <li className="form-check form-switch ms-auto">
            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"><a>DARK</a></label>
          </li>
          <a style={{ padding: 7 }}></a>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ whiteSpace: 'nowrap' }}>
              <Link to="/CSE442-542/2023-Fall/cse-442ae/build/" className="custom-link">HOME</Link>
            </ul>
            <a style={{ padding: 7 }}></a>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <Link to="/CSE442-542/2023-Fall/cse-442ae/build/login">
                <button className="btn btn-light rounded-pill" type="button" style={{ color: "#2E6F57" }}>SIGN IN</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  export default Navbar;
