import React from 'react';
import './App.css';
import displayModesImage from './Assets/display-modes.png';
import userImage from './Assets/user.png';

function Signup() {
    return (
      <div className="App">
        <Navbar />
        <LoginForm />
        <SettingsIcon />
      </div>
    );
  }
  
  function Navbar() {
    return (
      <div className="navbar">
        <span className="navbar-brand">UGRUB</span>
        <div className="navbar-right">
          <DarkModeToggle />
          <button className="navbar-button hover-grow home-link">Home</button>
          <span className="login-nav-text">LOG IN</span>
        </div>
      </div>
    );
  }
  
  function DarkModeToggle() {
    return (
      <button className="dark-mode-toggle">
        <img src={displayModesImage} alt="Toggle Dark Mode" width="40" />
      </button>
    );
  }
  
  function LoginForm() {
    return (
      <div className="login-container">
        <form action="login_process.php" method="POST">
          {/* ... other input fields ... */}
          <div className="input-container">
            <label for="username">User Name:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="input-container">
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-container">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="input-container">
            <label for="favorite-restaurant">Favorite Restaurant:</label>
            <input type="text" id="favorite-restaurant" name="favorite-restaurant" required />
          </div>
          <div className="input-container">
            <label for="academic-year">Academic Year:</label>
            <input type="text" id="academic-year" name="academic-year" required />
          </div>

          <button type="submit">CREATE</button>
        </form>
      </div>
    );
  }
  
  function SettingsIcon() {
    return (
      <a href="settings.html" className="setting-icon">
        <img src={userImage} alt="Settings Icon" width="70" />
      </a>
    );
  }
  
  export default Signup;
