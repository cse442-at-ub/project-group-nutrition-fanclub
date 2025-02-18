import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function AdminNavbar({ isLogin, handleLogout }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check dark mode preference
    const darkModePreference = localStorage.getItem('dark-mode');
    if (darkModePreference === 'enabled') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    // Check if the user is an admin
    const userRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage
    if (userRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);

    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', 'disabled');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', 'enabled');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#00AEEF' }}>
      <div className="container-fluid">
        <span className="navbar-brand" id="title">
          <h1>Keywsco Cleans</h1>
        </span>
        <li className="form-check form-switch ms-auto">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            <a>DARK</a>
          </label>
        </li>
        <a style={{ padding: 7 }}></a>
        <div className="d-flex align-items-center">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ whiteSpace: 'nowrap' }}>
            <Link to="/" className="custom-link">
              HOME
            </Link>
          </ul>
          <a style={{ padding: 7 }}></a>
          {/* Display TICKETS button only if the user is an admin */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ whiteSpace: 'nowrap' }}>
              <Link to="/tickets">
                <button
                  className="btn btn-light rounded-pill"
                  type="button"
                  style={{ color: '#2E6F57', fontWeight: 700 }}
                >
                  TICKETS
                </button>
              </Link>
            </ul>
          <a style={{ padding: 7 }}></a>
          {isLogin ? (
            <button
              className="btn btn-light rounded-pill"
              type="button"
              style={{ color: '#2E6F57', fontWeight: 700 }}
              onClick={handleLogout}
            >
              SIGN OUT
            </button>
          ) : (
            <Link to="/login">
              <button
                className="btn btn-light rounded-pill"
                type="button"
                style={{ color: '#2E6F57', fontWeight: 700 }}
              >
                SIGN IN
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
